import json
import os
from datetime import datetime
from typing import List, Literal, Optional
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI
from ollama import Client

load_dotenv(override=True)


class QuizItem(BaseModel):
    question: str
    options: List[str]
    correct_answer: Literal["A", "B", "C", "D"]
    explanation: str

class QuizSet(BaseModel):
    questions: List[QuizItem]

class OpenQuestion(BaseModel):
    prompt: str
    referenceAnswer: Optional[str]


class QuestionGenerator:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(QuestionGenerator, cls).__new__(cls)
            cls._instance._init_openai()
        return cls._instance

    def _init_openai(self):
        self.openrouter_client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=os.getenv("OPENAI_API_KEY")
        )
        self.ollama_client = Client(
            host="https://ollama.com",
            headers={'Authorization': os.getenv("OLLAMA_API_KEY")}
        )

        self.prompts = {
            "quiz": """
                You are an AI English Test Question Generator.

                Your task: From the given transcript or text, create a set of multiple-choice questions (MCQs) that test ONLY:
                - English grammar (tenses, articles, prepositions, conjunctions, sentence structure, subject-verb agreement)
                - Vocabulary (word meanings, synonyms, antonyms, phrasal verbs, collocations, idioms in context)

                Instructions:
                1. Do NOT create questions about culture, background knowledge, or speaker intentions.
                2. Follow the style of TOEIC/IELTS Part 5–6 grammar & vocabulary questions.
                3. Each question must have exactly 4 options (A–D).
                4. The field "correct_answer" must be exactly one of: "A", "B", "C", "D".
                5. Provide a simple, teacher-like explanation.
                6. Generate at least 10 MCQs.

                ### Output strictly in JSON format (array of objects).
                ### Do not include any extra text, comments, or markdown (no ```json, no explanations outside JSON).

                Example format:
                [
                {
                    "question": "Choose the correct verb form: She ___ to the office every day.",
                    "options": ["go", "goes", "going", "gone"],
                    "correct_answer": "B",
                    "explanation": "With third-person singular subject 'she', the verb must be 'goes'."
                }
                ]
            """,
            "writing": """
            You are an AI English Teacher.  
            Task: generate writing practice questions.  
            Each item must follow:
            {
              "prompt": "Write about ...",
              "referenceAnswer": "..."
            }
            Return at least 5 tasks.
            """,

            "speaking": """
            You are an AI English Teacher.  
            Task: generate speaking practice questions.  
            Each item must follow:
            {
              "prompt": "Talk about ...",
              "referenceAnswer": "..."
            }
            Return at least 5 tasks.
            """,
            "quiz_theory": """ 
                You are an English learning assistant. 
                You will be given a long transcript from a YouTube video. 
                Your job is NOT to summarize everything, but to extract only the **most useful and interesting English phrases, idioms, and expressions** for learners. 

                Rules:
                1. Select only the BEST phrases (about 10–20), not everything. 
                - Priority: phrases that are natural, conversational, or expressive. 
                - Skip filler words or basic vocabulary.
                2. Organize them into clear groups (e.g., “Phrases to describe…”, “Vocabulary to describe…”, “Expressing emotions…”).
                3. For each phrase:
                - Show the phrase in [brackets].
                - Give a short learner-friendly explanation (English only, simple).
                - Give 1 short example sentence.
                4. Highlight idioms, phrasal verbs, and common collocations.
                5. Keep output concise, beautiful, and easy to review (Markdown format).

                Output example:

                ## Phrases to describe your dream home
                - I’m looking to [upgrade the family home]. → to buy a better/newer house.  
                *Example*: We’re looking to upgrade the family home next year.

                - I’m hoping to stay under [200,000 dollars], but I could stretch it.  
                *To stretch* = to increase your budget.  
                *Example*: I wanted to spend $100, but I stretched my budget to $120.

                ## Vocabulary to describe spaces
                - [Cosy] = small, comfortable, and warm.  
                *Example*: The room feels cosy with the fireplace.

                ## Expressing opinion and emotions
                - [It blew my mind] = something was very exciting or unusual.  
                *Example*: The concert last night blew my mind.
            """
        }

    def generate_quiz(self, transcript_text: str) -> QuizSet:
        messages = [
            {"role": "system", "content": self.prompts["quiz"]},
            {"role": "user", "content": transcript_text},
        ]

        response = self.ollama_client.chat("gpt-oss:120b", messages=messages)

        content = response["message"]["content"]

        try:
            data = json.loads(content)
            quiz = QuizSet(questions=data)
            return quiz
        except Exception as e:
            raise ValueError(f"Lỗi parse QuizSet: {e}\nRaw content: {content}")
        

    def generate_open_questions(self, text: str, task_type: str) -> List[OpenQuestion]:
        messages = [
            {"role": "system", "content": self.prompts[task_type]},
            {"role": "user", "content": text}
        ]
        response = self.openrouter_client.chat.completions.parse(
            model="deepseek/deepseek-r1:free",
            messages=messages,
            response_format=List[OpenQuestion]
        )
        return response.choices[0].message.parsed
    
    def generate_quiz_theory(self, transcript_text: str) -> str:
        messages = [
            {"role": "system", "content": self.prompts["quiz_theory"]},
            {"role": "user", "content": transcript_text}
        ]

        response = self.ollama_client.chat(
            "gpt-oss:120b",
            messages=messages
        )

        return response["message"]["content"]

        # response = self.client.chat.completions.parse(
        #     model="deepseek/deepseek-r1:free",
        #     messages=messages,
        # )
        # return response.choices[0].message.content

        

    def to_node_format_quiz(self, quizset: QuizSet):
        quiz_questions = []
        for i, q in enumerate(quizset.questions, start=1):
            quiz_questions.append({
                "lessonPartId": "",
                "type": "quiz",
                "order": i,
                "prompt": q.question,
                "choices": q.options,
                "correctIndex": ord(q.correct_answer) - ord("A"),
                "referenceAnswer": q.explanation,
            })
        return quiz_questions

    def to_node_format_open(self, items: List[OpenQuestion], task_type: str):
        node_questions = []
        for i, q in enumerate(items, start=1):
            node_questions.append({
                "lessonPartId": "",
                "type": task_type,
                "order": i,
                "prompt": q.prompt,
                "referenceAnswer": q.referenceAnswer,
            })
        return node_questions


if __name__ == "__main__":
    gen = QuestionGenerator()

    quizset = gen.generate_quiz("Yesterday I was walking in the park and saw a dog.")
    quiz_nodes = gen.to_node_format_quiz(quizset)

    writing = gen.generate_open_questions("Theme: animals", "writing")
    writing_nodes = gen.to_node_format_open(writing, "writing")

    speaking = gen.generate_open_questions("Theme: daily routine", "speaking")
    speaking_nodes = gen.to_node_format_open(speaking, "speaking")

    print("QUIZ:", quiz_nodes[:1])
    print("WRITING:", writing_nodes[:1])
    print("SPEAKING:", speaking_nodes[:1])

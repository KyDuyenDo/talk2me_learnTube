const { questionQueue } = require("../queue/courseQueue");
const Question = require("../models/question");
const { fetchQuestionsFromAI } = require("../services/py.service");
const { getIO } = require("../socket/course.socket");

questionQueue.process("generateQuestions", async (job) => {
  const { lessonPartId, socketId, youtubeUrl } = job.data;
  const io = getIO();

  try {
    const questions = await fetchQuestionsFromAI(youtubeUrl);

    const saved = await Question.insertMany(
      questions.map((q) => ({
        ...q,
        lessonPartId,
        createdAt: Date.now()
      }))
    );

    io.to(socketId).emit("questionsGenerated", { lessonPartId, questions: saved });
    return { saved };
  } catch (error) {
    console.error('Failed to generate questions for lessonPartId:', lessonPartId, error);
    throw error;
  }
});


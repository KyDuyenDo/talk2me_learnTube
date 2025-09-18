const Course = require("../models/course");
const axios = require("axios");
const LessonPart = require("../models/lessonPart");
const Question = require("../models/question");


const createCourse = async (req, res, next) => {
    const { youtubeUrl, categoryId } = req.body;

    try {
        const info = await axios.post(
            "http://127.0.0.1:5000/api/generate/info",
            { youtubeUrl },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": "12345",
                },
            }
        );

        const newCourse = Course({
            categoryId,
            youtubeUrl,
            thumbnail: info.data.thumbnail,
            title: info.data.title,
            createdAt: Date.now(),
        })

        await newCourse.save()

        const lessonPart = new LessonPart({
            courseId: newCourse._id,
            type: "quiz",
            completed: false,
        });

        await lessonPart.save();

        // call api to generate questions for quiz
        const quizQuestions = await axios.post(
            "http://127.0.0.1:5000/api/generate/quiz",
            { youtubeUrl },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": "12345",
                },
            }
        );

        quizQuestions.data.questions.forEach(element => {
            const quiz = Question({
                ...element,
                lessonPartId: lessonPart._id,
            })
            quiz.save()
        });


        // cal api to generate questions for writing
        // const writingQuestions = [{
        //     lessonPartId: "",
        //     type: "writing",
        //     order: 1,
        //     prompt: "Describe a cat",
        //     referenceAnswer: "Black cat",
        //     createdAt: "22/12/2025"
        // }]

        // call api to generate questions for speaking
        // const speakingQuestions = [{
        //     lessonPartId: "",
        //     type: "speaking",
        //     order: 1,
        //     prompt: "Describe a cat",
        //     referenceAnswer: "Black cat",
        //     createdAt: "22/12/2025"
        // }]
        return res.status(200).json({
            info: info.data,
            quizQuestions: quizQuestions.data
        })
    } catch (error) {
        return res.status(500).json({
            error
        });
    }
};

module.exports = {
    createCourse
}
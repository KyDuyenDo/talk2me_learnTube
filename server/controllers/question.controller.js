const Question = require("../models/question")
const mongoose = require("mongoose")

const getQuestionsInLessonPart = async (req, res, next) => {
    try {
        const { lessonPartId, type } = req.query;


        const questions = await Question.find({ lessonPartId: new mongoose.Types.ObjectId(lessonPartId) })

        if (!questions || questions.length === 0) {
            return res.status(400).json({ message: "No question found" })
        }

        const question = await Question.findById(questions[0]._id)
            .populate({
                path: "lessonPartId",
                select: "courseId",
                populate: {
                    path: "courseId",
                    select: "youtubeUrl",
                },
            })
            .select("_id");


        return res.status(200).json({ questions, youtubeUrl: question?.lessonPartId?.courseId?.youtubeUrl || null })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getQuestionsInLessonPart
}
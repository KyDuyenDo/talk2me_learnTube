const mongoose = require("mongoose")

const { Schema } = mongoose;

const quizAnswerSchema = new Schema({
    userId: {
        type: Schema.types.ObjectId,
        required: true,
        ref: 'user'
    },
    lessonPartId: {
        type: Schema.types.ObjectId,
        required: true,
        ref: 'lessonPart'
    },
    questionId: {
        type: Schema.types.ObjectId,
        required: true,
        ref: 'question'
    },
    userAnswerIndex: Number,
    isCorrect: Boolean,
    submittedAt: { type: Date, default: Date.now }
});

const QuizAnswer = mongoose.model('quizAnswer', quizAnswerSchema);

export default QuizAnswer;
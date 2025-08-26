import mongoose from "mongoose";

const { Schema } = mongoose;

const writingAnswerSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    lessonPartId: { type: Schema.Types.ObjectId, ref: 'lessonPart', required: true },
    questionId: { type: Schema.Types.ObjectId, ref: 'question', required: true },
    answerText: { type: String, required: true },
    wordCount: Number,
    score: Number,
    feedback: String,
    submittedAt: { type: Date, default: Date.now }
});

const WritingAnswer = mongoose.model('writingAnswer', writingAnswerSchema);

export default WritingAnswer;
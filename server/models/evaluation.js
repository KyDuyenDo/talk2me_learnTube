import mongoose from "mongoose";

const { Schema } = mongoose;

const evaluationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    lessonPartId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'lessonPart'
    },
    type: {
        type: String,
        required: true,
        enum: ['quiz', 'writing', 'speaking'],
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    summary: {
        type: String,
        required: true,
        trim: true
    },
    strengths: {
        type: String,
        required: true,
        trim: true
    },
    weaknesses: {
        type: String,
        required: true,
        trim: true
    },
    recommendations: {
        type: String,
        required: true,
        trim: true
    },
    rawFeedback: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Evaluation = mongoose.model('evaluation', evaluationSchema);
export default Evaluation;
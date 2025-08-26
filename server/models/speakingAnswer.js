import mongoose from "mongoose";

const { Schema } = mongoose;

const speakingAnswerSchema = new Schema({
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
    audioUrl: {
        type: String,
        required: true,
    },
    durationSeconds: Number,
    fluencyScore: Number,
    pronunciationScore: Number,
    feedback: String,
    submittedAt: { type: Date, default: Date.now }
});

const SpeakingAnswer = mongoose.model('speakingAnswer', speakingAnswerSchema);

export default SpeakingAnswer;
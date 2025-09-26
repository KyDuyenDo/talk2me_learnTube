const mongoose = require("mongoose")

const { Schema } = mongoose;

const lessonPartSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'course'
    },
    type: {
        type: String,
        required: true,
        enum: ['quiz', 'writing', 'speaking'],
        trim: true
    },
    theory: {
        type: String,
        default: "",
    },
    completed: {
        type: Boolean,
        default: false
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
});

const LessonPart = mongoose.model('lessonPart', lessonPartSchema);
module.exports = LessonPart;

const mongoose = require("mongoose")

const { Schema } = mongoose;

const questionSchema = new Schema({
    lessonPartId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'lessonPart'
    },
    type: {
        type: String,
        required: true,
        enum: ['quiz', 'writing', 'speaking'],
        trim: true
    },
    order: {
        type: Number,
        required: true
    },
    prompt: {
        type: String,
        required: true,
        trim: true
    },
    choices: {
        type: [String],
        required: function () {
            return this.type === 'quiz';
        },
        validate: {
            validator: function (v) {
                return Array.isArray(v) && v.length > 0;
            },
            message: 'Choices must be a non-empty array.'
        }
    },
    correctIndex: {
        type: Number,
        required: function () {
            return this.type === 'quiz';
        },
        validate: {
            validator: function (v) {
                return Number.isInteger(v) && v >= 0 && v < (this.choices ? this.choices.length : 0);
            },
            message: 'Correct index must be a valid index of the choices array.'
        }
    },
    referenceAnswer: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Question = mongoose.model('question', questionSchema);
module.exports = Question;
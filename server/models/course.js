import mongoose from "mongoose";
const { Schema } = mongoose;

const courseSchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'category'
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    youtubeUrl: {
        type: String,
        required: true,
        trim: true
    },
    subtitle: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Course = mongoose.model('course', courseSchema);
export default Course;
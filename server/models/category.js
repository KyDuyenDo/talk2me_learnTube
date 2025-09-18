const mongoose = require("mongoose")

const { Schema } = mongoose;

const categorySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    label: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Category = mongoose.model('category', categorySchema);
export default Category;

import mongoose from "mongoose";

const { Schema } = mongoose;

const folderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Folder = mongoose.model('folder', folderSchema);
export default Folder;

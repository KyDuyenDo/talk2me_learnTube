import mongoose from "mongoose";
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre("save", async (next) => {
    const user = this
    if (!user.isModified("password")) {
        return next();
    }
    try {
        const salt = bcrypt.genSalt(10)
        user.passwordHash = bcrypt.hash(user.passwordHash, salt);
        return next()
    } catch (error) {
        return next(error);
    }

});

const User = mongoose.model('user', userSchema);
export default User;

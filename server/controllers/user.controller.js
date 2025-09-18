const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken")

const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const validPassword = await bcrypt.compare(password, user.passwordHash);
        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const payload = {
            id: user._id,
            email: user.email,
        };

        const accessToken = jwt.sign(payload, process.env.SECRET, {
            expiresIn: "6h"
        });

        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
            expiresIn: "7d"
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            accessToken,
        });
    } catch (error) {
        next(error);
    }
};

const logOut = async (req, res, next) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });

    return res.status(200).json({ message: "Logged out successfully" });
}

const refresh = async (req, res, next) => {
    try {
        const refreshToken = req.cookie.refreshToken;
        if (!refreshToken) return res.status(401).json({ message: "Refresh token not found" });

        jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: "Invalid or expired refresh token" });

            payload = { ...user }

            const accessToken = jwt.sign(payload, process.env.SECRET, {
                expiresIn: "6h"
            });

            return res.status(200).json({ accessToken });
        })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const createUser = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(409).json({
                "message": "User already exists"
            });
        }

        const newUser = User({
            email,
            name,
            passwordHash: password,
            createdAt: new Date().toLocaleString(),
        });

        newUser.save();

        return res.status(200).json({
            message: "User created successfully"
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    signIn,
    logOut,
    refresh,
    createUser
}
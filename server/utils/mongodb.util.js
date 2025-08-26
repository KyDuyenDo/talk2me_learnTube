const mongoose = require("mongoose");

class MongoDB {
    static connect = async (uri) => {
        try {
            await mongoose.connect(uri);
        } catch (error) {
            console.error("MongoDB connection error:", error);
        }
    }
}

module.exports = MongoDB;
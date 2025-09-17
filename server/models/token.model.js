const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  // accessToken: {
  //   type: String,
  //   required: true,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 6 * 60 * 60,
  },
});

module.exports = mongoose.model("tokens", tokenSchema);

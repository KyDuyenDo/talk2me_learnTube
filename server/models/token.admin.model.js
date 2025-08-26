const mongoose = require("mongoose");

const adminTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("adminToken", adminTokenSchema);

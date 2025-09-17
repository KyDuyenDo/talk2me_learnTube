const mongoose = require("mongoose");

class MongoDB {
  constructor() {
    if (MongoDB.instance) {
      return MongoDB.instance;
    }
    MongoDB.instance = this;
    this._connection = null;
  }

  async connect(uri) {
    if (this._connection) {
      return this._connection;
    }
    try {
      this._connection = await mongoose.connect(uri);
      console.log("MongoDB connected successfully");
      return this._connection;
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }

  getConnection() {
    return this._connection;
  }
}

module.exports = new MongoDB();

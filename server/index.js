const express = require("express");
require("dotenv").config();
const courseRouter = require("./routes/course.route");
const authRouter = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const MongoDB = require("./utils/mongodb.util");
const cors = require("cors");

// Kết nối MongoDB
MongoDB.connect(process.env.MONGODB_URI);

const app = express();

// Middleware
app.use(express.static("client"));
app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", courseRouter);
app.use("/user", authRouter);

// Lệnh chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

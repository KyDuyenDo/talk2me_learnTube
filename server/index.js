const express = require("express");
require("dotenv").config();
const courseRouter = require("./routes/course.route");
const authRouter = require("./routes/user.route");
const categoryRouter = require("./routes/category.route");
const cookieParser = require("cookie-parser");
const MongoDB = require("./utils/mongodb.util");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const helmet = require("helmet");

// Kết nối MongoDB
MongoDB.connect(process.env.MONGODB_URI);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static("client"));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(helmet());
// Routes
app.use("/api/course", courseRouter);
app.use("/api/user", authRouter);
app.use("/api/category", categoryRouter)


// Lệnh chạy server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

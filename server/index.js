const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const fileUpload = require("express-fileupload");
const helmet = require("helmet");


// MongoDB
const MongoDB = require("./utils/mongodb.util");
MongoDB.connect(process.env.MONGODB_URI);

// Routes
const courseRouter = require("./routes/course.route");
const authRouter = require("./routes/user.route");
const categoryRouter = require("./routes/category.route");
const lessonPartRouter = require("./routes/lessonPart.route")
const questionRouter = require("./routes/questions.route")

// Socket
const { initSocket } = require("./socket/course.socket");

// ⚡ Workers (Bull queue)
require("./workers/course.worker");
require("./workers/question.worker");
require("./workers/lessonPart.worker");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static("client"));

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(helmet());
// Routes
app.use("/api/course", courseRouter);
app.use("/api/user", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/lesson-part", lessonPartRouter);
app.use("/api/question", questionRouter);


// Create HTTP server for socket.io
const server = http.createServer(app);

// Initialize Socket.io
initSocket(server, (io) => {
  io.on('connection', (socket) => {
    console.log("user connected")
    socket.on('disconnect', () => console.log('user disconnected'));
  });
})

// Start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

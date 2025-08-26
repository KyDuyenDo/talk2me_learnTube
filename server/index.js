const express = require("express");
require("dotenv").config();
// Phân tích (parse) cookie từ request của client.
//Khi người dùng gửi request có cookie, middleware này giúp bạn đọc
const cookieParser = require("cookie-parser");
const MongoDB = require("./utils/mongodb.util");

MongoDB.connect('url');

const app = express();

// Cho phép Cross-Origin Resource Sharing
const cors = require("cors");

app.use(express.static("client"));
app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



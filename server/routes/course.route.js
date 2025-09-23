const express = require("express");
const authMiddleware = require("../middlewares/auth")
const { createCourse, getAllCourseByUser } = require("../controllers/course.controller");

const routes = express.Router();

routes.post("/", authMiddleware, createCourse);
routes.get("/", authMiddleware, getAllCourseByUser)

module.exports = routes;

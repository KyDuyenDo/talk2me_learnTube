const express = require("express");
const { createCourse } = require("../controllers/course.controller");

const routes = express.Router();

routes.post("/", createCourse);

module.exports = routes;

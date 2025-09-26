const express = require("express")
const { getLessonPartByCourse } = require("../controllers/lessionPart.controller")
const routes = express.Router()

routes.get("/", getLessonPartByCourse)

module.exports = routes


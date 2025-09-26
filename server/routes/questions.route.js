const express = require("express")
const { getQuestionsInLessonPart } = require("../controllers/question.controller")
const routes = express.Router()

routes.get("/", getQuestionsInLessonPart)

module.exports = routes


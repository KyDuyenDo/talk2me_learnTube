// services/lessonPartService.js
const LessonPart = require("../models/lessonPart");

async function createLessonParts(courseId) {
  const parts = ["quiz", "writing", "speaking"].map((type) => ({
    courseId,
    type,
    completed: false,
  }));

  return await LessonPart.insertMany(parts);
}

module.exports = { createLessonParts };

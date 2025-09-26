const LessonPart = require("../models/lessonPart")

const mongoose = require("mongoose")

const getLessonPartByCourse = async (req, res, next) => {
  try {
    const { courseId } = req.query

    const lessonPart = await LessonPart.find({ courseId: new mongoose.Types.ObjectId(courseId) })

    if (!lessonPart || lessonPart.length === 0) {
      return res.status(400).json({ message: "No lesson parts found" })
    }

    return res.status(200).json({ lessonPart })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}


module.exports = {
    getLessonPartByCourse
}
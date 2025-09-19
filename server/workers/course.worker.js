const { courseQueue, questionQueue } = require("../queue/courseQueue");
const Course = require("../models/course");
const { createLessonParts } = require("../services/lessonPartService");
const { fetchExternalCourseInfo } = require("../services/py.service");
const { getIO } = require("../socket/course.socket");

courseQueue.process("createCourse", async (job) => {
  const { courseData, socketId } = job.data;
  const io = getIO();

  try {
    const externalCourseInfo = await fetchExternalCourseInfo(courseData.youtubeUrl);

    const newCourse = await Course.create({
      ...courseData,
      ...externalCourseInfo,
    });

    io.to(socketId).emit("courseCreated", { course: newCourse });

    const lessonParts = await createLessonParts(newCourse._id);

    io.to(socketId).emit("lessonPartsCreated", { lessonParts });

    for (const part of lessonParts) {
      if (part.type === "quiz") {
        try {
          await questionQueue.add("generateQuestions", {
            lessonPartId: part._id,
            youtubeUrl: courseData.youtubeUrl,
            socketId,
          });
        } catch (quizJobError) {
          console.error(`Failed to add generateQuestions job for lessonPartId ${part._id}`, quizJobError);
        }
      }
    }

    return { courseId: newCourse._id };
  } catch (error) {
    console.error("Failed to create course:", error);
    throw error;
  }
});

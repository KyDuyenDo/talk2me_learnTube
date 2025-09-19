const { courseQueue, questionQueue } = require("../queue/courseQueue");
const Course = require("../models/course");
const { createLessonParts } = require("../services/lessonPartService");
const { fetchExternalCourseInfo } = require("../services/py.service");
const { getIO } = require("../socket/course.socket");
const delay = require("../utils/delay");

courseQueue.process("createCourse", async (job) => {
  console.log("start")
  const { courseData, socketId } = job.data;
  const io = getIO();

  // const externalCourseInfo = await fetchExternalCourseInfo(courseData.url);
  externalCourseInfo = {}

  const newCourse = await Course.create({
    ...courseData,
    ...externalCourseInfo,
  });

  io.to(socketId).emit("courseCreated", { course: newCourse });

  const lessonParts = await createLessonParts(newCourse._id);

  io.to(socketId).emit("lessonPartsCreated", { lessonParts });

  // for (const part of lessonParts) {
  //   if (part.type === "quiz") {
  //     await questionQueue.add("generateQuestions", {
  //       lessonPartId: part._id.toString(),
  //       socketId,
  //     });
  //   }
  // }

  return { courseId: newCourse._id };
});

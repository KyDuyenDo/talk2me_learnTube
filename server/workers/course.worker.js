const { courseQueue, questionQueue, lessonQueue } = require("../queue/courseQueue");
const Course = require("../models/course");
const { createLessonParts } = require("../services/lessonPartService");
const { fetchExternalCourseInfo } = require("../services/py.service");
const { getIO } = require("../socket/course.socket");

courseQueue.process("createCourse", async (job) => {
  const { courseData, socketId } = job.data;
  const io = getIO();

  const session = await Course.startSession();
  session.startTransaction();

  try {
    const externalCourseInfo = await fetchExternalCourseInfo(courseData.youtubeUrl);
    const [newCourse] = await Course.create(
      [{ ...courseData, ...externalCourseInfo }],
      { session }
    );

    // ① Notify client the course document is ready
    io.to(socketId).emit("courseCreated", { course: newCourse });

    const lessonParts = await createLessonParts(newCourse._id, session);

    await session.commitTransaction();
    session.endSession();

    // ② Notify client which lesson-part IDs exist (all pending theory/questions)
    io.to(socketId).emit("lessonPartsCreated", {
      courseId: newCourse._id,
      lessonParts: lessonParts.map((lp) => ({ _id: lp._id, type: lp.type })),
    });

    // ③ Queue theory generation (pass socketId so the worker can emit back)
    await lessonQueue.add("createTheory", {
      lessonParts,
      transcript: externalCourseInfo.transcript,
      socketId,
    });

    // ④ Queue question generation for quiz parts
    for (const part of lessonParts) {
      if (part.type === "quiz") {
        await questionQueue.add("generateQuestions", {
          lessonPartId: part._id,
          youtubeUrl: courseData.youtubeUrl,
          socketId,
        });
      }
    }

    return { courseId: newCourse._id };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Failed to create course:", error);
    throw error;
  }
});

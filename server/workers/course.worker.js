const { courseQueue, questionQueue, lessonQueue } = require("../queue/courseQueue");
const Course = require("../models/course");
const { createLessonParts } = require("../services/lessonPartService");
const { fetchExternalCourseInfo } = require("../services/py.service");
const { getUserSocket } = require("../socket/course.socket");

courseQueue.process("createCourse", async (job) => {
  const { courseData, userId } = job.data;
  const socket = getUserSocket(userId);


  const session = await Course.startSession();
  session.startTransaction();

  try {

    const externalCourseInfo = await fetchExternalCourseInfo(courseData.youtubeUrl);
    console.log("start 3")
    const [newCourse] = await Course.create(
      [{ ...courseData, ...externalCourseInfo }],
      { session }
    );
    console.log(newCourse)


    socket.emit("courseCreated", { course: newCourse }, () => {
      console.log('courseCreated')
    });

    const lessonParts = await createLessonParts(newCourse._id, session);

    await session.commitTransaction();
    session.endSession();

    await lessonQueue.add(
      "createTheory",
      { lessonParts, transcript: externalCourseInfo.transcript },
      // { attempts: 3, backoff: { type: "fixed", delay: 5000 } }
    );

    for (const part of lessonParts) {
      if (part.type === "quiz") {
        await questionQueue.add(
          "generateQuestions",
          {
            lessonPartId: part._id,
            youtubeUrl: courseData.youtubeUrl,
            socketId,
          },
          // { attempts: 3, backoff: { type: "exponential", delay: 3000 } }
        );
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

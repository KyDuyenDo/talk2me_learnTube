const { lessonQueue } = require("../queue/courseQueue");
const LessonPart = require("../models/lessonPart");
const { fetchQuizTheoryFromAI } = require("../services/py.service");
const { getIO } = require("../socket/course.socket");

lessonQueue.process("createTheory", 1, async (job) => {
  const { lessonParts, transcript, socketId } = job.data;
  const io = getIO();

  try {
    const theory = await fetchQuizTheoryFromAI(transcript);

    const ids = lessonParts.map(lp => lp._id);

    await LessonPart.updateMany(
      { _id: { $in: ids } },
      { $set: { theory } }
    );

    io.to(socketId).emit("theoryGenerated", { lessonParts, theory });

    return { updated: lessonParts.length };
  } catch (error) {
    console.error("Failed to generate theory:", error);
    throw error;
  }
});



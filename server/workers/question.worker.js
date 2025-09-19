const { questionQueue } = require("../queue/courseQueue");
const Question = require("../models/question");
const { fetchQuestionsFromAI } = require("../services/py.service");
const { getIO } = require("../socket/course.socket");
const delay = require("../utils/delay");

questionQueue.process("generateQuestions", async (job) => {
  const { lessonPartId, socketId } = job.data;
  const io = getIO();

  // const questions = await fetchQuestionsFromAI(lessonPartId);
  const questions = []

  const saved = await Question.insertMany(
    questions.map((q) => ({
      lessonPartId,
      ...q,
    }))
  );

  io.to(socketId).emit("questionsGenerated", {
    lessonPartId,
    questions: saved,
  });

  return { lessonPartId };
});

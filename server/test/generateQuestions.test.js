const { questionQueue } = require("../queue/courseQueue");
const Question = require("../models/question");
const { fetchQuestionsFromAI } = require("../services/py.service");
const { getIO } = require("../socket/course.socket");

jest.mock("../models/question");
jest.mock("../services/py.service");
jest.mock("../socket/course.socket");

describe("questionQueue - generateQuestions", () => {
  let mockIO;

  beforeEach(() => {
    mockIO = { to: jest.fn().mockReturnThis(), emit: jest.fn() };
    getIO.mockReturnValue(mockIO);
  });

  it("should fetch and save questions", async () => {
    const job = { data: { lessonPartId: "l1", socketId: "123", youtubeUrl: "url" } };
    fetchQuestionsFromAI.mockResolvedValue([{ q: "Q1", a: "A1" }]);
    Question.insertMany.mockResolvedValue([{ _id: "q1", q: "Q1", a: "A1" }]);

    const result = await questionQueue.handlers["generateQuestions"](job);

    expect(fetchQuestionsFromAI).toHaveBeenCalledWith("url");
    expect(Question.insertMany).toHaveBeenCalled();
    expect(mockIO.emit).toHaveBeenCalledWith("questionsGenerated", {
      lessonPartId: "l1",
      questions: [{ _id: "q1", q: "Q1", a: "A1" }],
    });
    expect(result).toEqual({ saved: [{ _id: "q1", q: "Q1", a: "A1" }] });
  });

  it("should throw error on failure", async () => {
    fetchQuestionsFromAI.mockRejectedValue(new Error("fail"));
    const job = { data: { lessonPartId: "l1", socketId: "123", youtubeUrl: "url" } };

    await expect(questionQueue.handlers["generateQuestions"](job)).rejects.toThrow("fail");
  });
});

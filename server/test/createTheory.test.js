const { lessonQueue } = require("../queue/courseQueue");
const LessonPart = require("../models/lessonPart");
const { fetchQuizTheoryFromAI } = require("../services/py.service");
const { getIO } = require("../socket/course.socket");

jest.mock("../models/lessonPart");
jest.mock("../services/py.service");
jest.mock("../socket/course.socket");

describe("lessonQueue - createTheory", () => {
  let mockIO;

  beforeEach(() => {
    mockIO = { to: jest.fn().mockReturnThis(), emit: jest.fn() };
    getIO.mockReturnValue(mockIO);
  });

  it("should generate theory and update lessonParts", async () => {
    const job = { data: { lessonParts: ["l1", "l2"], transcript: "trans", socketId: "123" } };
    fetchQuizTheoryFromAI.mockResolvedValue("theory text");
    LessonPart.updateMany.mockResolvedValue({ nModified: 2 });

    const result = await lessonQueue.handlers["createTheory"](job);

    expect(fetchQuizTheoryFromAI).toHaveBeenCalledWith("trans");
    expect(LessonPart.updateMany).toHaveBeenCalledWith(
      { _id: { $in: ["l1", "l2"] } },
      { $set: { theory: "theory text" } }
    );
    expect(mockIO.emit).toHaveBeenCalledWith("theoryGenerated", {
      lessonParts: ["l1", "l2"],
      theory: "theory text",
    });
    expect(result).toEqual({ updated: 2 });
  });

  it("should throw on failure", async () => {
    fetchQuizTheoryFromAI.mockRejectedValue(new Error("AI error"));
    const job = { data: { lessonParts: ["l1"], transcript: "t", socketId: "123" } };

    await expect(lessonQueue.handlers["createTheory"](job)).rejects.toThrow("AI error");
  });
});

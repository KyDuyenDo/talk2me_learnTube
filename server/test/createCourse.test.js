const { courseQueue } = require("../queue/courseQueue");
const Course = require("../models/course");
const { createLessonParts } = require("../services/lessonPartService");
const { fetchExternalCourseInfo } = require("../services/py.service");
const { getIO } = require("../socket/course.socket");

jest.mock("../models/course");
jest.mock("../services/lessonPartService");
jest.mock("../services/py.service");
jest.mock("../socket/course.socket");

describe("courseQueue - createCourse", () => {
  let mockSession, mockIO;

  beforeEach(() => {
    mockSession = {
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      abortTransaction: jest.fn(),
      endSession: jest.fn(),
    };
    Course.startSession.mockResolvedValue(mockSession);

    mockIO = { to: jest.fn().mockReturnThis(), emit: jest.fn() };
    getIO.mockReturnValue(mockIO);
  });

  it("should create course and emit events", async () => {
    const job = { data: { courseData: { youtubeUrl: "url" }, socketId: "123" } };

    fetchExternalCourseInfo.mockResolvedValue({ transcript: "text" });
    Course.create.mockResolvedValue([{ _id: "c1", title: "test course" }]);
    createLessonParts.mockResolvedValue([{ _id: "l1", type: "quiz" }]);

    const result = await courseQueue.handlers["createCourse"](job);

    expect(fetchExternalCourseInfo).toHaveBeenCalledWith("url");
    expect(Course.create).toHaveBeenCalled();
    expect(createLessonParts).toHaveBeenCalled();
    expect(mockIO.emit).toHaveBeenCalledWith("courseCreated", { course: { _id: "c1", title: "test course" } });
    expect(result).toEqual({ courseId: "c1" });
  });

  it("should rollback transaction on error", async () => {
    const job = { data: { courseData: { youtubeUrl: "url" }, socketId: "123" } };

    fetchExternalCourseInfo.mockRejectedValue(new Error("fail"));

    await expect(courseQueue.handlers["createCourse"](job)).rejects.toThrow("fail");

    expect(mockSession.abortTransaction).toHaveBeenCalled();
    expect(mockSession.endSession).toHaveBeenCalled();
  });
});

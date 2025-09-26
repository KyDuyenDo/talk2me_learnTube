function createDebugTests() {
  const LessonPart = require("../models/lessonPart")
  const { createLessonParts } = require("../services/lessonPartService")
  const { lessonQueue } = require("../queue/courseQueue")

  // Mock dependencies within the test function
  if (typeof jest !== "undefined") {
    jest.mock("../models/lessonPart")
  }

  describe("Debug LessonPart Issues", () => {
    test("should debug lesson part creation flow", async () => {
      console.log(" === DEBUGGING LESSON PART FLOW ===")

      const mockCourseId = "507f1f77bcf86cd799439000"

      const mockLessonParts = [
        { courseId: mockCourseId, type: "quiz", theory: "", completed: false },
        { courseId: mockCourseId, type: "writing", theory: "", completed: false },
        { courseId: mockCourseId, type: "speaking", theory: "", completed: false },
      ]

      if (LessonPart.insertMany && typeof jest !== "undefined") {
        LessonPart.insertMany = jest.fn().mockResolvedValue(mockLessonParts)
      }

      console.log(" Step 1: Creating lesson parts")
      const createdParts = await createLessonParts(mockCourseId)
      console.log(" Created lesson parts:", createdParts)

      console.log(" Step 2: Checking if worker would be called")
      const jobData = {
        lessonParts: createdParts.map((p) => p._id || "mock-id"),
        transcript: "Sample course transcript",
        socketId: "test-socket",
      }

      console.log(" Job data that should be sent to worker:", jobData)

      console.log(" Step 3: Verifying queue setup")
      if (typeof expect !== "undefined") {
        expect(lessonQueue).toBeDefined()
      }
      console.log(" Lesson queue name:", lessonQueue.name)

      console.log(" === DEBUG COMPLETE ===")
    })

    test("should check API endpoint availability", () => {
      console.log(" === CHECKING API ENDPOINTS ===")

      const lessonPartController = require("../controllers/lessionPart.controller")
      console.log(" Available controller methods:", Object.keys(lessonPartController))

      const lessonPartRoutes = require("../routes/lessonPart.route")
      console.log(" Routes loaded successfully")

      console.log(" API endpoint: GET /api/lesson-part")
      console.log(" Expected query parameter: courseId")

      console.log(" === API CHECK COMPLETE ===")
    })
  })
}

// Export or run the tests
if (typeof module !== "undefined" && module.exports) {
  module.exports = createDebugTests
} else {
  createDebugTests()
}

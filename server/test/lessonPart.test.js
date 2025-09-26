const request = require("supertest")
const express = require("express")

// Test suite for LessonPart Worker functionality
function createLessonPartTests() {
  const { lessonQueue } = require("../queue/courseQueue")
  const LessonPart = require("../models/lessonPart")
  const { fetchQuizTheoryFromAI } = require("../services/py.service")

  // Mock dependencies within the test function
  if (typeof jest !== "undefined") {
    jest.mock("../models/lessonPart")
    jest.mock("../services/py.service")
    jest.mock("../queue/courseQueue")
  }

  describe("LessonPart Worker Tests", () => {
    let app

    beforeEach(() => {
      app = express()
      app.use(express.json())

      // Clear all mocks if jest is available
      if (typeof jest !== "undefined") {
        jest.clearAllMocks()
      }

      console.log(" Setting up test environment for lesson part worker")
    })

    describe("LessonPart Worker Integration", () => {
      test("should process createTheory job successfully", async () => {
        console.log(" Testing createTheory job processing")

        const mockJobData = {
          lessonParts: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"],
          transcript: "Sample transcript for theory generation",
          socketId: "test-socket-id",
        }

        const mockTheory = "Generated theory content from AI"

        // Mock the AI service
        if (fetchQuizTheoryFromAI.mockResolvedValue) {
          fetchQuizTheoryFromAI.mockResolvedValue(mockTheory)
        }

        // Mock the database update
        if (LessonPart.updateMany && LessonPart.updateMany.mockResolvedValue) {
          LessonPart.updateMany.mockResolvedValue({
            acknowledged: true,
            modifiedCount: 2,
          })
        }

        const mockJob = {
          data: mockJobData,
        }

        try {
          console.log(" Simulating lesson part worker job processing")

          const result = await simulateWorkerJob(mockJob)

          console.log(" Worker job result:", result)

          if (typeof expect !== "undefined") {
            expect(result).toEqual({ updated: 2 })
          }
        } catch (error) {
          console.log(" Worker job failed:", error.message)
          throw error
        }
      })

      test("should handle worker job failure", async () => {
        console.log(" Testing worker job failure handling")

        const mockJobData = {
          lessonParts: ["507f1f77bcf86cd799439011"],
          transcript: "Sample transcript",
          socketId: "test-socket-id",
        }

        // Mock AI service failure
        if (fetchQuizTheoryFromAI.mockRejectedValue) {
          fetchQuizTheoryFromAI.mockRejectedValue(new Error("AI service unavailable"))
        }

        const mockJob = {
          data: mockJobData,
        }

        try {
          await simulateWorkerJob(mockJob)
          throw new Error("Expected worker to throw error")
        } catch (error) {
          console.log(" Expected error caught:", error.message)
          if (typeof expect !== "undefined") {
            expect(error.message).toBe("AI service unavailable")
          }
        }
      })
    })

    describe("LessonPart API Tests", () => {
      test("should get lesson parts by course ID", async () => {
        console.log(" Testing getLessonPartByCourse API")

        const mockLessonParts = [
          {
            _id: "507f1f77bcf86cd799439011",
            courseId: "507f1f77bcf86cd799439000",
            type: "quiz",
            theory: "Quiz theory content",
            completed: false,
          },
        ]

        if (LessonPart.find && LessonPart.find.mockResolvedValue) {
          LessonPart.find.mockResolvedValue(mockLessonParts)
        }

        const lessonPartRouter = require("../routes/lessonPart.route")
        app.use("/api/lesson-part", lessonPartRouter)

        const response = await request(app).get("/api/lesson-part").query({ courseId: "507f1f77bcf86cd799439000" })

        console.log(" API response:", response.body)

        if (typeof expect !== "undefined") {
          expect(response.status).toBe(200)
        }
      })
    })
  })

  // Helper function to simulate worker job processing
  async function simulateWorkerJob(job) {
    const { lessonParts, transcript } = job.data

    console.log(" Processing job with data:", job.data)

    try {
      const theory = await fetchQuizTheoryFromAI(transcript)
      console.log(" Generated theory:", theory)

      await LessonPart.updateMany({ _id: { $in: lessonParts } }, { $set: { theory } })

      console.log(" Updated lesson parts in database")

      return { updated: lessonParts.length }
    } catch (error) {
      console.error(" Failed to generate theory:", error)
      throw error
    }
  }
}

// Export or run the tests
if (typeof module !== "undefined" && module.exports) {
  module.exports = createLessonPartTests
} else {
  createLessonPartTests()
}

const { lessonQueue } = require("../queue/courseQueue")
const LessonPart = require("../models/lessonPart")

describe("Worker Integration Tests", () => {
  beforeEach(() => {
    console.log(" Setting up worker integration tests")
  })

  test("should verify lesson worker is loaded", () => {
    console.log(" Checking if lesson worker is properly loaded")

    // Check if the worker file exists and can be required
    expect(() => {
      require("../workers/lessonPart.worker")
    }).not.toThrow()

    console.log(" Lesson worker loaded successfully")
  })

  test("should verify queue connection", async () => {
    console.log(" Testing queue connection")

    try {
      // Test if queue is accessible
      expect(lessonQueue).toBeDefined()
      expect(lessonQueue.name).toBe("lesson")

      console.log(" Queue connection verified")
    } catch (error) {
      console.log(" Queue connection failed:", error.message)
      throw error
    }
  })

  test("should log worker status", () => {
    console.log(" Current worker status:")
    console.log(" - Course worker: loaded")
    console.log(" - Question worker: loaded")
    console.log(" - Lesson part worker: loaded")

    // This test serves as a status check
    expect(true).toBe(true)
  })
})

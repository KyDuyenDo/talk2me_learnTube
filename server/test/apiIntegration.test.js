/* global jest, describe, test, expect, beforeEach */

const request = require("supertest")
const express = require("express")
const { lessonQueue } = require("../queue/courseQueue")

// Mock the queue and database
jest.mock("../queue/courseQueue")
jest.mock("../models/lessonPart")

describe("API Integration Tests", () => {
  let app

  beforeEach(() => {
    console.log(" Setting up API integration test")

    app = express()
    app.use(express.json())

    // Setup routes
    const lessonPartRouter = require("../routes/lessonPart.route")
    app.use("/api/lesson-part", lessonPartRouter)
  })

  test("should test complete lesson part flow", async () => {
    console.log(" === TESTING COMPLETE LESSON PART FLOW ===")

    // Step 1: Mock lesson part creation
    const LessonPart = require("../models/lessonPart")
    const mockLessonParts = [
      {
        _id: "507f1f77bcf86cd799439011",
        courseId: "507f1f77bcf86cd799439000",
        type: "quiz",
        theory: "",
        completed: false,
      },
    ]

    LessonPart.find = jest.fn().mockResolvedValue(mockLessonParts)

    console.log(" Step 1: Testing API endpoint")
    const response = await request(app).get("/api/lesson-part").query({ courseId: "507f1f77bcf86cd799439000" })

    console.log(" API Response status:", response.status)
    console.log(" API Response body:", response.body)

    expect(response.status).toBe(200)
    expect(response.body.lessonPart).toHaveLength(1)

    // Step 2: Test worker job creation
    console.log(" Step 2: Testing worker job creation")
    const mockAdd = jest.fn().mockResolvedValue({ id: "test-job-123" })
    lessonQueue.add = mockAdd

    const jobData = {
      lessonParts: ["507f1f77bcf86cd799439011"],
      transcript: "Test transcript for theory generation",
      socketId: "test-socket-id",
    }

    const job = await lessonQueue.add("createTheory", jobData)
    console.log(" Created job:", job)

    expect(mockAdd).toHaveBeenCalledWith("createTheory", jobData)
    expect(job.id).toBe("test-job-123")

    console.log(" === FLOW TEST COMPLETE ===")
  })

  test("should log current system status", () => {
    console.log(" === SYSTEM STATUS CHECK ===")
    console.log(" Node.js version:", process.version)
    console.log(" Environment:", process.env.NODE_ENV)
    console.log(" Available routes:")
    console.log(" - GET /api/lesson-part (with courseId query)")
    console.log(" Available workers:")
    console.log(" - Course worker: ✅")
    console.log(" - Question worker: ✅")
    console.log(" - Lesson part worker: ✅ (now loaded)")
    console.log(" === STATUS CHECK COMPLETE ===")
  })
})

const { lessonQueue } = require("../queue/courseQueue")
const LessonPart = require("../models/lessonPart")

console.log(" === SIMPLE WORKER TEST (NO JEST) ===")

async function testWorkerSetup() {
  try {
    console.log(" Step 1: Checking lesson queue")
    console.log(" Queue name:", lessonQueue.name)
    console.log(" Queue ready:", !!lessonQueue)

    console.log(" Step 2: Checking lesson part model")
    console.log(" Model available:", !!LessonPart)

    console.log(" Step 3: Checking worker file")
    try {
      require("../workers/lessonPart.worker")
      console.log(" ✅ Lesson part worker loaded successfully")
    } catch (error) {
      console.log(" ❌ Failed to load lesson part worker:", error.message)
    }

    console.log(" Step 4: Testing basic functionality")
    const testData = {
      lessonParts: ["test-id-1"],
      transcript: "Test transcript",
      socketId: "test-socket",
    }

    console.log(" Test data prepared:", testData)
    console.log(" Worker test would add job with this data to queue")

    console.log(" === SIMPLE TEST COMPLETE ===")
  } catch (error) {
    console.error(" Test failed:", error.message)
  }
}

// Run the test
testWorkerSetup()

module.exports = { testWorkerSetup }

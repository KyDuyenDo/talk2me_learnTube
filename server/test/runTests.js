const { execSync } = require("child_process")

console.log(" === RUNNING LESSON PART TESTS ===")

try {
  console.log(" Step 1: Running lesson part specific tests")
  execSync("npx jest test/lessonPart.test.js --verbose", { stdio: "inherit" })

  console.log(" Step 2: Running debug tests")
  execSync("npx jest test/debugLessonPart.test.js --verbose", { stdio: "inherit" })

  console.log(" Step 3: Running API integration tests")
  execSync("npx jest test/apiIntegration.test.js --verbose", { stdio: "inherit" })

  console.log(" === ALL TESTS COMPLETED SUCCESSFULLY ===")
} catch (error) {
  console.error(" === TESTS FAILED ===")
  console.error(" Error:", error.message)
  process.exit(1)
}

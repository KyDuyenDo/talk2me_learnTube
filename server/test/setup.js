console.log(" Setting up Jest test environment")

// Mock environment variables
// process.env.NODE_ENV = "test"
// process.env.MONGODB_URI = "mongodb://localhost:27017/test_db"
// process.env.PORT = "8001"

// Global test utilities
global.console = {
  ...console,
  log: (...args) => {
    if (args[0] && args[0].includes("")) {
      console.info(...args)
    }
  },
  error: console.error,
  warn: console.warn,
  info: console.info,
}

// Setup global test timeout only if jest is available
if (typeof global !== "undefined" && global.jest) {
  global.jest.setTimeout(10000)
}

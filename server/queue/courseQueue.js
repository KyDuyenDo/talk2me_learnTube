const Queue = require("bull");

const courseQueue = new Queue("course", {
  redis: { host: "127.0.0.1", port: 6379 },
});
const questionQueue = new Queue("question", {
  redis: { host: "127.0.0.1", port: 6379 },
});

module.exports = { courseQueue, questionQueue };

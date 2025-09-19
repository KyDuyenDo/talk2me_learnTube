const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("supertest");
const Client = require("socket.io-client");

const { initSocket } = require("../socket/course.socket");
const { createCourse } = require("../controllers/course.controller");

// ✅ import workers để Bull queue xử lý
require("../workers/course.worker");
require("../workers/question.worker");

describe("Socket events with Bull queue + Redis", () => {
  let io, server, app, clientSocket;

  beforeAll((done) => {
    app = express();
    app.use(bodyParser.json());
    app.post("/courses", createCourse);

    server = http.createServer(app);
    io = initSocket(server);

    server.listen(() => {
      const port = server.address().port;
      clientSocket = new Client(`http://localhost:${port}`, {
        transports: ["websocket"],
        forceNew: true,
      });
      clientSocket.on("connect", () => {
        console.log("✅ Client connected");
        done();
      });
    });
  });

  afterAll((done) => {
    if (clientSocket.connected) clientSocket.disconnect();
    io.close();
    server.close(done);
  });

  it(
    "should emit socket events step by step",
    (done) => {
      const events = [];

      clientSocket.on("courseCreated", (data) => {
        console.log("📩 Received courseCreated:", data);
        events.push("courseCreated");
      });

      clientSocket.on("lessonPartsCreated", (data) => {
        console.log("📩 Received lessonPartsCreated:", data);
        events.push("lessonPartsCreated");
      });

      clientSocket.on("questionsGenerated", (data) => {
        console.log("📩 Received questionsGenerated:", data);
        events.push("questionsGenerated");

        try {
          expect(events).toEqual([
            "courseCreated",
            "lessonPartsCreated",
            "questionsGenerated",
          ]);
          done();
        } catch (err) {
          done(err);
        }
      });

      // gọi API để trigger queue
      request(app)
        .post("/courses?socketId=" + clientSocket.id)
        .send({ title: "My Test Course", url: "http://fake.com" })
        .then(() => {
          console.log("📤 createCourse API called");
        });
    },
    20000
  );
});

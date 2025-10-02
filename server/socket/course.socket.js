const userSockets = new Map();
function initSocket(io) {
    io.on("connection", (socket) => {
    console.log("⚡ New socket:", socket.id);
    socket.on("register", (userId) => {
        userSockets.set(userId, socket);
        console.log(`✅ User ${userId} registered with socket ${socket.id}`);
    });

    socket.on("disconnect", () => {
        [...userSockets.entries()].forEach(([userId, s]) => {
            if (s.id === socket.id) {
            userSockets.delete(userId);
            console.log(`❌ User ${userId} disconnected`);
            }
        });
    });
  });
}

function getUserSocket(userId) {
  return userSockets.get(userId);
}

function getSocketAll() {
  return userSockets;
}

module.exports = { initSocket, getUserSocket, getSocketAll };

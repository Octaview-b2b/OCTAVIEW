import { Server } from "socket.io";
import http from "http";

export function initWebSocketServer(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: "*", // Adjust based on allowed frontend origins
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New WebSocket connection:", socket.id);

    // Handle joining a room
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`${socket.id} joined room ${roomId}`);

      // Notify others in the room about the new user
      socket.to(roomId).emit("newUser", { message: `${socket.id} joined` });

      // Relay signaling data
      socket.on("signal", ({ roomId, data }) => {
        socket.to(roomId).emit("signal", data);
      });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}
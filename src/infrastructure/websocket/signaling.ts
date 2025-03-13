import { Server as SocketIOServer } from "socket.io";
import http from "http";

export const initWebSocketServer = (server: http.Server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: ["GET", "POST"],
    },
    transports: ["websocket"],
    pingTimeout: 60000, // 60 seconds
    pingInterval: 25000, // 25 seconds
  });

  const rooms = new Map<string, Set<string>>();

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-room", (roomId: string) => {
      try {
        if (!roomId) {
          throw new Error("Room ID is required");
        }

        if (!rooms.has(roomId)) {
          rooms.set(roomId, new Set());
        }

        const room = rooms.get(roomId)!;
        room.add(socket.id);
        socket.join(roomId);

        if (room.size > 1) {
          socket.to(roomId).emit("user-joined");
        }

        console.log(`User ${socket.id} joined room ${roomId}. Users in room: ${room.size}`);
      } catch (error) {
        console.error("Error joining room:", error);
        socket.emit("error", { message: "Failed to join room" });
      }
    });

    socket.on("leave-room", (roomId: string) => {
      try {
        if (rooms.has(roomId)) {
          const room = rooms.get(roomId)!;
          room.delete(socket.id);
          if (room.size === 0) {
            rooms.delete(roomId);
          }
          socket.leave(roomId);
          console.log(`User ${socket.id} left room ${roomId}. Users in room: ${room.size}`);
        }
      } catch (error) {
        console.error("Error leaving room:", error);
        socket.emit("error", { message: "Failed to leave room" });
      }
    });

    socket.on("offer", ({ roomId, offer }) => {
      console.log(`Relaying offer from ${socket.id} in room ${roomId}`, offer);
      socket.to(roomId).emit("offer", { offer });
    });

    socket.on("answer", ({ roomId, answer }) => {
      console.log(`Relaying answer from ${socket.id} in room ${roomId}`, answer);
      socket.to(roomId).emit("answer", { answer });
    });

    socket.on("ice-candidate", ({ roomId, candidate }) => {
      console.log(`Relaying ICE candidate from ${socket.id} in room ${roomId}`, candidate);
      socket.to(roomId).emit("ice-candidate", { candidate });
    });

    socket.on("disconnect", () => {
      rooms.forEach((users, roomId) => {
        if (users.has(socket.id)) {
          users.delete(socket.id);
          if (users.size === 0) {
            rooms.delete(roomId);
          }
        }
      });
      console.log("User disconnected:", socket.id);
    });
  });
};
import { Server as SocketIOServer } from "socket.io";
import http from "http";

export const initWebSocketServer = (server: http.Server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "https://octaview.tech",
      methods: ["GET", "POST"],
    },
    transports: ["websocket"]
  });

  const rooms = new Map<string, Map<string, any>>();  // Update rooms structure to store more data per room

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Handle join-room
    socket.on("join-room", (roomId: string) => {
      // Initialize room if it doesn't exist
      if (!rooms.has(roomId)) {
        rooms.set(roomId, new Map());
      }

      const room = rooms.get(roomId)!;
      room.set(socket.id, { isFullscreen: false });  // Initialize user's fullscreen state
      socket.join(roomId);

      // Notify other users in the room
      if (room.size > 1) {
        socket.to(roomId).emit("user-joined");
      }

      // Send current fullscreen status to the user who joined
      socket.emit("fullscreen-status", { isFullscreen: Array.from(room.values())[0].isFullscreen });

      console.log(`User ${socket.id} joined room ${roomId}. Users in room: ${room.size}`);
    });

    // Handle fullscreen status change
    socket.on("fullscreen-status", (roomId: string, isFullscreen: boolean) => {
      console.log(`Relaying fullscreen status from ${socket.id} in room ${roomId}: ${isFullscreen}`);
      
      const room = rooms.get(roomId);
      if (room) {
        // Update fullscreen state for the user
        const user = room.get(socket.id);
        if (user) {
          user.isFullscreen = isFullscreen;  // Update fullscreen state for this user
        }
        
        // Relay the fullscreen status to other users in the room
        socket.to(roomId).emit("fullscreen-status", { isFullscreen });
      }
    });

    // Handle WebRTC signaling
    socket.on("offer", ({ roomId, offer }) => {
      console.log(`Relaying offer from ${socket.id} in room ${roomId}`);
      socket.to(roomId).emit("offer", { offer });
    });

    socket.on("answer", ({ roomId, answer }) => {
      console.log(`Relaying answer from ${socket.id} in room ${roomId}`);
      socket.to(roomId).emit("answer", { answer });
    });

    socket.on("ice-candidate", ({ roomId, candidate }) => {
      console.log(`Relaying ICE candidate from ${socket.id} in room ${roomId}`);
      socket.to(roomId).emit("ice-candidate", { candidate });
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      // Remove user from all rooms they were in
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

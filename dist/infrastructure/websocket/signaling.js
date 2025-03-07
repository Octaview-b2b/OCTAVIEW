"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWebSocketServer = void 0;
const socket_io_1 = require("socket.io");
const initWebSocketServer = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
        },
        transports: ["websocket"]
    });
    const rooms = new Map();
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        socket.on("join-room", (roomId) => {
            // Initialize room if it doesn't exist
            if (!rooms.has(roomId)) {
                rooms.set(roomId, new Set());
            }
            const room = rooms.get(roomId);
            room.add(socket.id);
            socket.join(roomId);
            // Notify other users in the room
            if (room.size > 1) {
                socket.to(roomId).emit("user-joined");
            }
            console.log(`User ${socket.id} joined room ${roomId}. Users in room: ${room.size}`);
        });
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
exports.initWebSocketServer = initWebSocketServer;

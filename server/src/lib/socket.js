import { Server } from "socket.io";
import http from "http";
import express from "express";

const CLIENT_PORT = process.env.CLIENT_PORT;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: `http://localhost:${CLIENT_PORT}`,
    },
});

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

// used to store online users
const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("a user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, server, app, getReceiverSocketId };

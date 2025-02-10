import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import express from "express";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { server, app } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const CLIENT_PORT = process.env.CLIENT_PORT;
const __dirname = path.resolve();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: [`http://localhost:${CLIENT_PORT}`],
        credentials: true,
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (_req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
    });
}

server.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
    connectDB();
});

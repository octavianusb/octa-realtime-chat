import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { server, app } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const CLIENT_PORT = process.env.CLIENT_PORT;

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

server.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
    connectDB();
});

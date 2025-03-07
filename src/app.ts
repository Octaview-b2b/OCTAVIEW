import express, { Request, Response } from "express";
import router from "./app/routers/index";
import { connectDb } from "./infrastructure/data-sources/mongodb/mongodb-contact-data-source";
import dotenv from "dotenv";
import { initWebSocketServer } from "./infrastructure/websocket/signaling";
import http from "http";
import cors from "cors";

dotenv.config();

const app = express();
const server = http.createServer(app); // Attach HTTP server for WebSocket
initWebSocketServer(server);

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));

app.use(express.json());
app.use("/api", router);

app.use((err: any, _req: Request, res: Response) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

(async () => {
  try {
    await connectDb();
    server.listen(PORT, () => { 
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
})();

export default app;

import { Router } from "express";
import { roomIdGenerater } from "../../../utils/GenerateApiKey";

const meetRouter = Router();

meetRouter.get("/create", (req, res) => {
  const roomId = roomIdGenerater();
  res.json({ roomId, inviteLink: `http://localhost:5000/meet/${roomId}` });
});

export default meetRouter;
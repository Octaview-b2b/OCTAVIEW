import { Router, Request, Response } from "express";
import { roomIdGenerater } from "../../../utils/GenerateApiKey";
import { MeetController } from "../../controllers/user/meet_Controllers";

const meetRouter = Router();


meetRouter.post('/send-meeting-invite', async (req: Request, res: Response) => { await MeetController.sendLink(req, res);})
meetRouter.post("/compile", async (req: Request, res: Response) => { await MeetController.executeCode(req, res);});


export default meetRouter;  
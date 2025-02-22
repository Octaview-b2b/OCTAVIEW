import { Request,Response } from "express";
import { Judge0Service } from "../../../infrastructure/services/judge0Service";

export class MeetController {
    static async executeCode(req: Request, res: Response) {
        try {
            const { languageId, sourceCode, stdin } = req.body;

            if (!languageId || !sourceCode) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            const result = await Judge0Service.submitCode(languageId, sourceCode, stdin);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : "Internal Server Error" });
        }
    }
}
import { Request,Response } from "express";
import { Judge0Service } from "../../../infrastructure/services/judge0Service";
import { emailTemplates } from "../../../utils/EmailTemp";
import { EmailService } from "../../../utils/EmailService";
const emailService = new EmailService();

export class MeetController {
    static executeCode= async(req: Request, res: Response)=> {
        try {
            const { languageId, sourceCode, stdin } = req.body;
            console.log('req.body :', req.body);

            if (!languageId || !sourceCode) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            const result = await Judge0Service.submitCode(languageId, sourceCode, stdin);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : "Internal Server Error" });
        }
    }

    static sendLink = async(req: Request, res: Response)=> {
        const { candidateEmail, candidateName, meetingUrl, jobTitle, interviewDate, interviewTime,companyName } = req.body;

    if (!candidateEmail || !meetingUrl) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    
    try {
        const emailHtml = emailTemplates.interviewInvite(candidateName, jobTitle, interviewDate, interviewTime, meetingUrl,companyName);
        console.log('emailHtml :', emailHtml);
        
        await emailService.sendEmail(candidateEmail, `Interview Invitation- ${companyName}`, emailHtml);
        
        res.status(200).json({ message: "Interview invite sent successfully!" });
    } catch (error) {
        console.error("Error sending interview invite:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
}
}
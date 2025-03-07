"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetController = void 0;
const judge0Service_1 = require("../../../infrastructure/services/judge0Service");
const EmailTemp_1 = require("../../../utils/EmailTemp");
const EmailService_1 = require("../../../utils/EmailService");
const emailService = new EmailService_1.EmailService();
class MeetController {
}
exports.MeetController = MeetController;
_a = MeetController;
MeetController.executeCode = async (req, res) => {
    try {
        const { languageId, sourceCode, stdin } = req.body;
        console.log('req.body :', req.body);
        if (!languageId || !sourceCode) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const result = await judge0Service_1.Judge0Service.submitCode(languageId, sourceCode, stdin);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Internal Server Error" });
    }
};
MeetController.sendLink = async (req, res) => {
    const { candidateEmail, candidateName, meetingUrl, jobTitle, interviewDate, interviewTime, companyName } = req.body;
    if (!candidateEmail || !meetingUrl) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const emailHtml = EmailTemp_1.emailTemplates.interviewInvite(candidateName, jobTitle, interviewDate, interviewTime, meetingUrl, companyName);
        console.log('emailHtml :', emailHtml);
        await emailService.sendEmail(candidateEmail, `Interview Invitation- ${companyName}`, emailHtml);
        res.status(200).json({ message: "Interview invite sent successfully!" });
    }
    catch (error) {
        console.error("Error sending interview invite:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
};

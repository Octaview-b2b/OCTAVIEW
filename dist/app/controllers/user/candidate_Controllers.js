"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Candidate_Controller = void 0;
class Candidate_Controller {
    constructor(candidateUseCase) {
        this.candidateUseCase = candidateUseCase;
    }
    async apply4Job(req, res) {
        console.log("Received job application request");
        try {
            const { fullName, DOB, linkedin, country, email, contactNo, github } = req.body;
            const resume = req.file;
            const jobId = req.params.jobId;
            if (!resume) {
                res.status(400).json({ error: "Resume file is required" });
                return;
            }
            const jobApplicationDetails = {
                fullName,
                DOB,
                linkedin,
                country,
                email,
                contactNo,
                github,
                jobId,
                resumeUrl: "",
            };
            await this.candidateUseCase.execute(jobApplicationDetails, resume);
            res
                .status(201)
                .json({ message: "Job application submitted successfully" });
        }
        catch (error) {
            res.status(500).json({
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    }
    async getCandidate(req, res) {
        try {
            const { jobId } = req.params;
            console.log('jobId /candidte ', jobId);
            const candidate = await this.candidateUseCase.getApplications(jobId);
            console.log('data applications:', candidate);
            res.status(200).json(candidate);
        }
        catch (error) {
            res.status(500).json({
                error: error instanceof Error ? error.message : "Internal server error",
            });
        }
    }
}
exports.Candidate_Controller = Candidate_Controller;

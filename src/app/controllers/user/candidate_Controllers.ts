import { Request, Response } from "express";
import { CandidateUseCase } from "../../../core/use-cases/user/CandidateUseCase";

export class Candidate_Controller {
  constructor(private candidateUseCase: CandidateUseCase) {}

  async apply4Job(req: Request, res: Response): Promise<void> {

    try {
      const { fullName, DOB, linkedin, country, email, contactNo, github } =
        req.body;

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
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  }

  async getCandidate(req:Request,res:Response){
    try {
      const { jobId } = req.params;
      console.log('jobId /candidte ',jobId);
      
      const candidate = await this.candidateUseCase.getApplications(jobId)
      
      res.status(200).json(candidate)
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  }
}

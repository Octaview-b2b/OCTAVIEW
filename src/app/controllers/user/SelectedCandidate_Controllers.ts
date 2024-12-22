import { Request, Response } from "express";
import { SelectedCandidateUseCase } from "../../../core/use-cases/user/SelectedCandidateUseCase";
import { log } from "console";

export class SelectedCandidateController {
    constructor(private selectedCandidateUseCase: SelectedCandidateUseCase) {}

    selectCandidate = async (req: Request, res: Response): Promise<void> => {
      try {
        const { candidateId, jobId, meetUrl, report, status } = req.body;
  
        console.log("Request Body: ", req.body);
        await this.selectedCandidateUseCase.selectCandidate(
          candidateId,
          jobId,
          meetUrl || "",
          report || "",
          status || "onhold"
        );
  
        res.status(200).json({ message: "Candidate selected successfully." });
      } catch (error) {
        res.status(500).json({
          error: error instanceof Error ? error.message : "Internal server error",
        });
      }
    };
  

    getSelectedCandidates = async (req: Request, res: Response): Promise<void> => {
      try {
        const { jobId } = req.params;
        const selectedCandidates = await this.selectedCandidateUseCase.getSelectedCandidates(jobId);
  
        res.status(200).json(selectedCandidates);
      } catch (error) {
        res.status(500).json({
          error: error instanceof Error ? error.message : "Internal server error",
        });
      }
    };
  }
  
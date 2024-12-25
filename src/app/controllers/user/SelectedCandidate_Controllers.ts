import { Request, Response } from "express";
import { SelectedCandidateUseCase } from "../../../core/use-cases/user/SelectedCandidateUseCase";
import { log } from "console";

export class SelectedCandidateController {
    constructor(private selectedCandidateUseCase: SelectedCandidateUseCase) {}

    selectCandidate = async (req: Request, res: Response): Promise<void> => {
      try {
        const { candidateId, jobId, meetUrl, report, status } = req.body;
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
        console.log('get selected candidateata',selectedCandidates);
  
        res.status(200).json(selectedCandidates);
      } catch (error) {
        res.status(500).json({
          error: error instanceof Error ? error.message : "Internal server error",
        });
      }
    };

     rejectCandidate = async (req:Request, res:Response):Promise<void>=>{
        try {
            const {candidateId} = req.params;
            await this.selectedCandidateUseCase.deleteSelectedCandidate(candidateId);
            res.status(200).json({message:"Candidate rejected successfully"});
        } catch (error) {
            error instanceof Error ? error.message : "Internal server error";
        }
     }
  }
  
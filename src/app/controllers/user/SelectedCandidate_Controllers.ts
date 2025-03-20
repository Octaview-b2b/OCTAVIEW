import { Request, Response } from "express";
import { SelectedCandidateUseCase } from "../../../core/use-cases/user/SelectedCandidateUseCase";


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
          status || ""
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

     rejectCandidate = async (req:Request, res:Response):Promise<void>=>{
        try {
            const {candidateId} = req.params;
            await this.selectedCandidateUseCase.deleteSelectedCandidate(candidateId);
            res.status(200).json({message:"Candidate rejected successfully"});
        } catch (error) {
            error instanceof Error ? error.message : "Internal server error";
        }
     }

     updateInterviewDateTime = async (req: Request, res: Response): Promise<void>=> {
      const { selectedCandidateId } = req.params;
      const { interviewDate, interviewTime } = req.body;
      console.log('updateInterviewDateTime', selectedCandidateId, interviewDate, interviewTime);
      
      try {
        await this.selectedCandidateUseCase.updateInterviewDateTimeUseCase(
          selectedCandidateId,
          interviewDate,
          interviewTime
        );
        console.log(`Successfully updated interview date and time for candidate: ${selectedCandidateId}`);
        res.status(200).json({ message: "Interview date and time updated successfully." });
      } catch (error) {
        console.error("Error in updating interview date and time:", error);
        res.status(500).json({ message: error instanceof Error ? error.message : "Internal server error" });
      }
    }

    getScheduledInterviewsByUserId = async (req: Request, res: Response): Promise<void> => {
      try {
        const { userId } = req.params; 
        const scheduledInterviews = await this.selectedCandidateUseCase.getScheduledInterviewsByUserId(userId);
  
        if (scheduledInterviews.length === 0) {
          res.status(404).json({ message: "No scheduled interviews found for this user." });
        } else {
          res.status(200).json(scheduledInterviews);
        }
      } catch (error) {
        res.status(500).json({
          error: error instanceof Error ? error.message : "Internal server error",
        });
      }
    };
  }
  
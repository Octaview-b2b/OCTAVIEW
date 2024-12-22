import { ISelectedCandidateRepository } from "../../core/interfaces/user/ISelectedCadidate";
import SelectedCandidateModel from "../data-sources/mongodb/models/SelectedCandidate";
import CandidateModel from "../data-sources/mongodb/models/Candidate";
import { SelectedCandidateEntity } from "../../core/entities/selectedCandidateEntity";

export class SelectedCandidateRepository implements ISelectedCandidateRepository {
  async save(selectedCandidate: SelectedCandidateEntity): Promise<void> {
    try {
      const newSelectedCandidate = new SelectedCandidateModel({
        candidate: selectedCandidate.candidate,
        job: selectedCandidate.job,
        date: selectedCandidate.date,
        meetUrl: selectedCandidate.meetUrl,
        report: selectedCandidate.report,
        status: selectedCandidate.status,
      });

      await newSelectedCandidate.save();

    } catch (error) {
      console.error("Error saving selected candidate:", error);
      throw new Error("Failed to save selected candidate.");
    }
  }
async isCandidateSelected(candidateId: string, jobId: string): Promise<boolean> {
    try {
      const existingSelection = await SelectedCandidateModel.findOne({ 
        candidate: candidateId, 
        job: jobId 
      }).exec();
  
      return !!existingSelection; 
    } catch (error) {
      console.error("Error checking if candidate is selected:", error);
      throw new Error("Failed to check candidate selection.");
    }
  }
  

  async getByJobId(jobId: string): Promise<SelectedCandidateEntity[]> {
    try {
      const selectedCandidates = await SelectedCandidateModel.find({ job: jobId })
        .populate("candidate")
        .populate("job")
        .exec();

      return selectedCandidates.map((candidate) => {
        return SelectedCandidateEntity.create(
          candidate.candidate.toString(),
          candidate.job.toString(),
          candidate.date,
          candidate.meetUrl,
          candidate.report,
          candidate.status
        );
      });
    } catch (error) {
      console.error("Error fetching selected candidates:", error);
      throw new Error("Failed to fetch selected candidates.");
    }
  }
  async updateSelectionStatus(candidateId: string): Promise<void> {
    try {
      await CandidateModel.findByIdAndUpdate(
        candidateId,
        { selection: true }
      );
    } catch (error) {
      console.error("Error updating candidate selection status:", error);
      throw new Error("Failed to update candidate selection status.");
    }
  }

}

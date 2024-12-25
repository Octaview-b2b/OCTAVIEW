import { ISelectedCandidateRepository } from "../../core/interfaces/user/ISelectedCadidate";
import SelectedCandidateModel from "../data-sources/mongodb/models/SelectedCandidate";
import CandidateModel, { ICandidateModal } from "../data-sources/mongodb/models/Candidate";
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
  

  async getByJobId(jobId: string): Promise<any[]> {
    try {
      console.log('jobId fromm repo',jobId);
      
      const selectedCandidates = await SelectedCandidateModel.find({ job: jobId })  // Query based on jobId in SelectedCandidate
        .populate("candidate")  // Populate candidate details
        .exec();
  
      return selectedCandidates.map((candidate: any) => {
        const candidateData = candidate.candidate as ICandidateModal; // Type assertion here
  
        // Check if candidateData is properly populated before accessing properties
        if (!candidateData) {
          throw new Error('Candidate data is not populated properly');
        }
  
        return {
          _id: candidate._id.toString(),  // _id of the SelectedCandidate document
          candidate: {
            _id: candidateData._id.toString(),  // _id of the Candidate document
            fullName: candidateData.fullName,
            DOB: candidateData.DOB,
            linkedin: candidateData.linkedin,
            resumeUrl: candidateData.resumeUrl,
            country: candidateData.country,
            email: candidateData.email,
            contactNo: candidateData.contactNo,
            status: candidateData.status,
            github: candidateData.github,
            selection: candidateData.selection,
          },
          selectionStatus: candidate.status,  // The selection status from SelectedCandidate
          meetUrl: candidate.meetUrl,
          report: candidate.report,
          date: candidate.date,
        };
      });
    } catch (error) {
      console.error("Error fetching selected candidates:", error);
      throw new Error("Failed to fetch selected candidates.");
    }
  }
  
  

  async deleteSelectedCandidate(candidateId: string): Promise<void> {
    try {
     await SelectedCandidateModel.findOneAndDelete({ candidate: candidateId });
     await CandidateModel.findByIdAndDelete(candidateId);

    } catch (error) {
      console.error("Error deleting selected candidate and candidate:", error);
      throw new Error("Failed to delete selected candidate and candidate.");
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

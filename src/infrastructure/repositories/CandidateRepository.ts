import { CandidateEntity } from "../../core/entities/candidateEntity";
import { ICandidate } from "../../core/interfaces/user/ICandidate";
import CandidateModel from "../data-sources/mongodb/models/Candidate";
import { JobModel } from "../data-sources/mongodb/models/Jobs";

export class CandidateRepository implements ICandidate {

  async save(candidate: CandidateEntity, jobId: string): Promise<void> {
    try {
      console.log("data :"+candidate);
      
      const newCandidate = new CandidateModel({
        fullName: candidate.fullName,
        dob: candidate.DOB,
        linkedin: candidate.linkedin,
        country: candidate.country,
        email: candidate.email,
        contactNo: candidate.contactNo,
        github: candidate.github,
        resumeUrl: candidate.resumeUrl,
        jobId,
      });
  
      await newCandidate.save(); 
      await  JobModel.findByIdAndUpdate(jobId,{$push:{applications:newCandidate._id}})
    } catch (error) {
      console.error("Error saving candidate:", error);
      throw new Error("Failed to save candidate.");
    }
  }
}

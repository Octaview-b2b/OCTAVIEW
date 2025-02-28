import { CandidateEntity } from "../../core/entities/candidateEntity";
import { ICandidate } from "../../core/interfaces/user/ICandidate";
import CandidateModel, { ICandidateModal } from "../data-sources/mongodb/models/Candidate";
import { JobModel } from "../data-sources/mongodb/models/Jobs";
import { UserModel } from "../data-sources/mongodb/models/User";

export class CandidateRepository implements ICandidate {

  async save(candidate: CandidateEntity, jobId: string): Promise<void> {
    try {
      console.log("Saving candidate:", candidate);
  
      // Fetch the job and populate the user (employer)
      const job = await JobModel.findById(jobId).populate("user");
      if (!job) {
        throw new Error("Job not found.");
      }
  
      if (!job.user) {
        throw new Error("Employer reference missing in job.");
      }
  
      // Find the employer (user)
      const employer = await UserModel.findById(job.user);
      console.log("Employer:", employer);
      if (!employer) {
        throw new Error("Employer not found.");
      }
  
      // Check if employer has sufficient tokens
      if (employer.token <= 0) {
        throw new Error("Insufficient tokens. Cannot accept new applications.");
      }
  
      // Create and save the new candidate
      const newCandidate = new CandidateModel({
        fullName: candidate.fullName,
        DOB: candidate.DOB,
        linkedin: candidate.linkedin,
        country: candidate.country,
        email: candidate.email,
        contactNo: candidate.contactNo,
        github: candidate.github,
        resumeUrl: candidate.resumeUrl,
        jobId,
        user: employer._id,
      });
  
      await newCandidate.save();
  
      // Push candidate ID into job applications
      await JobModel.findByIdAndUpdate(jobId, {
        $push: { applications: newCandidate._id },
      });
  
      // Decrement employer token
      await UserModel.findByIdAndUpdate(employer._id, {
        $inc: { token: -1 },
      });
  
      console.log(
        `Application successful! Remaining tokens for employer: ${employer.token - 1}`
      );
    } catch (error) {
      console.error("Error saving candidate:", error);
      throw new Error("Failed to save candidate.");
    }
  }
  
  async getData(jobId: string): Promise<CandidateEntity[]> {
    try {
      const jobWithCandidates = await JobModel.findById(jobId).populate("applications").exec();
      if (!jobWithCandidates) {
        throw new Error("Job not found.");
      }
      const candidates = jobWithCandidates.applications as unknown as ICandidateModal[];
      const filteredCandidates = candidates.filter(candidate => !candidate.selection);


      return filteredCandidates.map((candidate) => {
        return {
          id: candidate._id, 
          fullName: candidate.fullName,
          DOB: candidate.DOB,
          linkedin: candidate.linkedin,
          country: candidate.country,
          email: candidate.email,
          contactNo: candidate.contactNo,
          github: candidate.github,
          resumeUrl: candidate.resumeUrl,
        };
      });
    } catch (error) {
      console.error("Error fetching candidates:", error);
      throw new Error("Failed to fetch candidates.");
    }
  }


  
    
}

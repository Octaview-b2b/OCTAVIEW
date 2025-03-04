import { ISelectedCandidateRepository } from "../../core/interfaces/user/ISelectedCadidate";
import SelectedCandidateModel from "../data-sources/mongodb/models/SelectedCandidate";
import CandidateModel, { ICandidateModal } from "../data-sources/mongodb/models/Candidate";
import { SelectedCandidateEntity } from "../../core/entities/selectedCandidateEntity";
import { UserModel } from "../data-sources/mongodb/models/User";
import { time } from "console";
import mongoose from "mongoose";

export class SelectedCandidateRepository implements ISelectedCandidateRepository {
  async save(selectedCandidate: SelectedCandidateEntity): Promise<void> {
    try {
      console.log("Saving candidate with status:", selectedCandidate.status); // Debugging log

      const newSelectedCandidate = new SelectedCandidateModel({
        candidate: selectedCandidate.candidate,
        job: selectedCandidate.job,
        time: selectedCandidate.time,
        date: selectedCandidate.date,
        report: selectedCandidate.report,
        status: selectedCandidate.status,
      });

      await newSelectedCandidate.save();
      console.log("Candidate saved successfully");

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
      console.log('jobId from repo', jobId);

      // MongoDB Aggregation to filter by "onhold" status
      const selectedCandidates = await SelectedCandidateModel.aggregate([
        {
          $match: {
            job: new mongoose.Types.ObjectId(jobId), // Match by jobId
            status: "shortlisted"  // Only "onhold" candidates
          }
        },
        {
          $lookup: {
            from: "candidates", // Join with the "candidates" collection
            localField: "candidate",
            foreignField: "_id",
            as: "candidate"
          }
        },
        { $unwind: "$candidate" },  // Flatten the candidate data
        {
          $project: {  // Project the required fields
            selectedCandidateId: "$_id",
            candidate: {
              _id: "$candidate._id",
              fullName: "$candidate.fullName",
              DOB: "$candidate.DOB",
              linkedin: "$candidate.linkedin",
              resumeUrl: "$candidate.resumeUrl",
              country: "$candidate.country",
              email: "$candidate.email",
              contactNo: "$candidate.contactNo",
              status: "$candidate.status",
              github: "$candidate.github",
              selection: "$candidate.selection",
            },
            selectionStatus: "$status",
            meetUrl: "$meetUrl",
            report: "$report",
            date: "$date",
            time: "$time", // Including the time field as well
          }
        }
      ]);

      return selectedCandidates;
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

  async updateInterviewDateTimeRepo(
    selectedCandidateId: string,
    interviewDate: string,
    interviewTime: string
  ): Promise<void> {
    try {
      const updatedCandidate = await SelectedCandidateModel.findByIdAndUpdate(
        selectedCandidateId,
        {
          date: interviewDate,
          time: interviewTime,
          status: "scheduled"
        },
        { new: true, runValidators: true }
      )
        .populate({
          path: "candidate",
          populate: {
            path: "jobId",
            populate: { path: "user" }  // ✅ Fixed: Using "user" instead of "companyId"
          },
          options: { strictPopulate: false }
        })
        .exec();
  
      if (!updatedCandidate) {
        throw new Error("Selected candidate not found.");
      }
  
      console.log("Updated Candidate:", updatedCandidate);
    } catch (error) {
      console.error("Error in updating interview date and time:", error);
  
      throw new Error("Failed to update interview date and time.");
    }
  }
  
  
  
  
  
  async getScheduledInterviewsByUserId(userId: string): Promise<any[]> {
    try {
      console.log('Fetching scheduled interviews for userId:', userId);

      // Find jobs created by the user
      const userJobs = await UserModel.findById(userId).select("jobs").populate("jobs").exec();

      if (!userJobs || !userJobs.jobs.length) {
        return []; // Return an empty array if no jobs are found for the user
      }

      const scheduledInterviews = await SelectedCandidateModel.find({
        job: { $in: userJobs.jobs }, // Match jobs created by the user
        status: "scheduled",         // Filter by "scheduled" status
      })
        .populate("candidate")       // Populate candidate details
        .populate("job")             // Populate job details
        .exec();

      // Map over the results and return formatted data
      return scheduledInterviews.map((candidate: any) => {
        const candidateData = candidate.candidate as ICandidateModal; // Type assertion for candidate
        const jobData = candidate.job;                               // Get the job details

        // Ensure candidateData is populated
        if (!candidateData) {
          throw new Error('Candidate data is not populated properly');
        }

        // Ensure jobData is populated
        if (!jobData) {
          throw new Error('Job data is not populated properly');
        }

        return {
          selectedCandidateId: candidate._id.toString(), // SelectedCandidate ID
          candidate: {
            _id: candidateData._id.toString(),
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
          selectionStatus: candidate.status,
          report: candidate.report,
          date: candidate.date,
          time: candidate.time, // Include time field
          job: {
            jobId: jobData._id.toString(),         // Job ID
            jobTitle: jobData.job_title,              // Job title
            jobLocation: jobData.location,        // Job location     
            jobLevel: jobData.job_level,              // Job level
          },
        };
      });
    } catch (error) {
      console.error("Error fetching scheduled interviews:", error);
      throw new Error("Failed to fetch scheduled interviews.");
    }
  }


  async getDataForEmail(candidateId: string): Promise<{
    candidateName: string;
    jobTitle: string;
    companyName: string;
    email: string;
  }> {
    try {
      interface CandidateDataType {
        fullName: string;
        email: string;
        jobId?: {
          job_title?: string;
          user?: { companyName?: string };
        };
      }
  
      let candidateData = {} as CandidateDataType;
  

      const selectedCandidate = await SelectedCandidateModel.findById(candidateId)
        .populate({
          path: "candidate",
          select: "fullName email jobId",
          populate: {
            path: "jobId",
            select: "job_title user",
            populate: {
              path: "user",
              select: "companyName", 
              options: { strictPopulate: false },
            },
          },
        })
        .lean()
        .exec();
  
      if (selectedCandidate?.candidate) {
        candidateData = selectedCandidate.candidate as unknown as typeof candidateData;
      } else {
        candidateData = (await CandidateModel.findById(candidateId)
          .select("fullName email jobId")
          .populate({
            path: "jobId",
            select: "job_title user",
            populate: {
              path: "user",
              select: "companyName", 
              options: { strictPopulate: false },
            },
          })
          .lean()
          .exec()) as typeof candidateData;
      }
  
      if (!candidateData || !candidateData.email) {
        throw new Error("Candidate email not found.");
      }
  
      return {
        candidateName: candidateData.fullName,
        email: candidateData.email,
        jobTitle: candidateData.jobId?.job_title || "Unknown Job",
        companyName: candidateData.jobId?.user?.companyName ?? "Company Name Not Available", 
      };
    } catch (error) {
      console.error("Error fetching candidate details:", error);
      throw new Error("Failed to fetch candidate details.");
    }
  }
  
}
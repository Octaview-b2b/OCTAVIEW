"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateRepository = void 0;
const Candidate_1 = __importDefault(require("../data-sources/mongodb/models/Candidate"));
const Jobs_1 = require("../data-sources/mongodb/models/Jobs");
const User_1 = require("../data-sources/mongodb/models/User");
class CandidateRepository {
    async save(candidate, jobId) {
        try {
            console.log("Saving candidate:", candidate);
            // Fetch the job and populate the user (employer)
            const job = await Jobs_1.JobModel.findById(jobId).populate("user");
            if (!job) {
                throw new Error("Job not found.");
            }
            if (!job.user) {
                throw new Error("Employer reference missing in job.");
            }
            // Find the employer (user)
            const employer = await User_1.UserModel.findById(job.user);
            console.log("Employer:", employer);
            if (!employer) {
                throw new Error("Employer not found.");
            }
            // Check if employer has sufficient tokens
            if (employer.token <= 0) {
                throw new Error("Insufficient tokens. Cannot accept new applications.");
            }
            // Create and save the new candidate
            const newCandidate = new Candidate_1.default({
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
            await Jobs_1.JobModel.findByIdAndUpdate(jobId, {
                $push: { applications: newCandidate._id },
            });
            // Decrement employer token
            await User_1.UserModel.findByIdAndUpdate(employer._id, {
                $inc: { token: -1 },
            });
            console.log(`Application successful! Remaining tokens for employer: ${employer.token - 1}`);
        }
        catch (error) {
            console.error("Error saving candidate:", error);
            throw new Error("Failed to save candidate.");
        }
    }
    async getData(jobId) {
        try {
            const jobWithCandidates = await Jobs_1.JobModel.findById(jobId).populate("applications").exec();
            if (!jobWithCandidates) {
                throw new Error("Job not found.");
            }
            const candidates = jobWithCandidates.applications;
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
        }
        catch (error) {
            console.error("Error fetching candidates:", error);
            throw new Error("Failed to fetch candidates.");
        }
    }
}
exports.CandidateRepository = CandidateRepository;

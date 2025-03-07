"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateUseCase = void 0;
const awsConfig_1 = require("../../../config/awsConfig");
const candidateEntity_1 = require("../../entities/candidateEntity");
class CandidateUseCase {
    constructor(candidateRepository) {
        this.candidateRepository = candidateRepository;
    }
    async execute(jobApplicationDetails, resume) {
        try {
            const resumeUrl = await (0, awsConfig_1.uploadResumeToS3)(resume);
            const jobApplication = candidateEntity_1.CandidateEntity.create(jobApplicationDetails.jobId, jobApplicationDetails.fullName, jobApplicationDetails.DOB, jobApplicationDetails.linkedin, jobApplicationDetails.country, jobApplicationDetails.email, jobApplicationDetails.contactNo, jobApplicationDetails.github, resumeUrl);
            await this.candidateRepository.save(jobApplication, jobApplicationDetails.jobId);
        }
        catch (error) {
            console.error('Error in CandidateUseCase:', error);
            throw new Error('Error during candidate job application processing.');
        }
    }
    async getApplications(jobId) {
        return await this.candidateRepository.getData(jobId);
    }
}
exports.CandidateUseCase = CandidateUseCase;

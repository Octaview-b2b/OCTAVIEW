"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobUseCase = void 0;
class JobUseCase {
    constructor(jobRepository) {
        this.jobRepository = jobRepository;
    }
    async createJob(jobData, userId) {
        await this.jobRepository.create(jobData, userId);
    }
    async getJobsByUserIdWithPagination(userId, page, searchQuery = "") {
        const pageSize = 4; // Set page size
        // Fetch jobs with pagination and optional search query
        const { jobs, totalJobs } = await this.jobRepository.findJobsPerIdWithPagination(userId, page, pageSize, searchQuery);
        const hasMore = (page * pageSize) < totalJobs;
        const nextPage = hasMore ? page + 1 : null;
        return { jobs, hasMore, nextPage };
    }
    async editJob(jobId, jobData) {
        await this.jobRepository.update(jobId, jobData);
    }
    async deleteJob(jobId, userId) {
        await this.jobRepository.delete(jobId, userId);
    }
    async getAllJobsByUserId(userId) {
        const jobs = await this.jobRepository.findJobsWithoutPagination(userId);
        return jobs;
    }
}
exports.JobUseCase = JobUseCase;

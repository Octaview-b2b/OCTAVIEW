"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRepository = void 0;
const jobEntity_1 = require("../../core/entities/jobEntity");
const Jobs_1 = require("../data-sources/mongodb/models/Jobs");
const User_1 = require("../data-sources/mongodb/models/User");
class JobRepository {
    async create(job, userId) {
        const newJob = await Jobs_1.JobModel.create({ ...job, user: userId });
        await User_1.UserModel.findByIdAndUpdate(userId, { $push: { jobs: newJob._id } });
    }
    async findJobsPerIdWithPagination(userId, page, pageSize, searchQuery = "") {
        const user = await User_1.UserModel.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        // Correctly construct the searchMatch filter
        const searchMatch = searchQuery
            ? {
                $or: [
                    { "jobs.job_title": { $regex: searchQuery, $options: "i" } },
                    { "jobs.job_role": { $regex: searchQuery, $options: "i" } },
                    { "jobs.skills": { $regex: searchQuery, $options: "i" } },
                ],
            }
            : {};
        const aggregationResult = await User_1.UserModel.aggregate([
            { $match: { _id: user._id } }, // Match the user by ID
            {
                $lookup: {
                    from: "jobs",
                    localField: "jobs",
                    foreignField: "_id",
                    as: "jobs",
                },
            },
            { $unwind: "$jobs" }, // Unwind jobs array
            { $match: searchMatch }, // Filter by search query
            { $sort: { "jobs.createdAt": -1 } }, // Sort by job creation date
            {
                $facet: {
                    paginatedJobs: [
                        { $skip: (page - 1) * pageSize }, // Pagination: Skip
                        { $limit: pageSize }, // Pagination: Limit
                    ],
                    totalCount: [{ $count: "total" }], // Count total results
                },
            },
        ]);
        // Handle aggregation result
        const result = aggregationResult[0];
        const jobs = result.paginatedJobs || [];
        const totalJobs = result.totalCount[0]?.total || 0;
        // Map jobs to JobEntity instances
        const jobEntities = jobs.map((job) => new jobEntity_1.JobEntity(job.jobs._id, job.jobs.job_title, job.jobs.skills, job.jobs.job_role, job.jobs.type, job.jobs.min_salary, job.jobs.max_salary, job.jobs.job_level, job.jobs.location, job.jobs.city, job.jobs.description));
        return { jobs: jobEntities, totalJobs };
    }
    async update(jobId, job) {
        const updatedJob = await Jobs_1.JobModel.findByIdAndUpdate(jobId, job, { new: true });
        if (!updatedJob) {
            throw new Error("Job not found or failed to update");
        }
    }
    async delete(jobId, userId) {
        const job = await Jobs_1.JobModel.findById(jobId);
        if (!job) {
            throw new Error("Job not found");
        }
        await User_1.UserModel.findByIdAndUpdate(userId, { $pull: { jobs: jobId } });
        await Jobs_1.JobModel.findByIdAndDelete(jobId);
    }
    async findJobsWithoutPagination(userId) {
        try {
            // Fetch the user and ensure the user exists
            const user = await User_1.UserModel.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }
            // Fetch all the jobs related to the user
            const jobs = await Jobs_1.JobModel.find({ _id: { $in: user.jobs } });
            // Convert job documents to JobEntity instances
            const jobEntities = jobs.map((job) => new jobEntity_1.JobEntity(job._id, job.job_title, job.skills, job.job_role, job.jobType, job.min_salary, job.max_salary, job.job_level, job.location, job.city, job.description));
            return jobEntities;
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "Internal server error");
        }
    }
}
exports.JobRepository = JobRepository;

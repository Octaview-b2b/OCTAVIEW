import { log } from "console";
import { JobEntity } from "../../core/entities/jobEntity";
import { IjobRepository } from "../../core/interfaces/repositories/IJobRepository";
import { JobModel } from "../data-sources/mongodb/models/Jobs";
import { UserModel } from "../data-sources/mongodb/models/User";


export class JobRepository implements IjobRepository {
    async create(job: JobEntity, userId: string): Promise<void> {
        const newJob = await JobModel.create(job)
        await UserModel.findByIdAndUpdate(userId, { $push: { jobs: newJob._id } })
    }

    async findJobsPerIdWithPagination(userId: string, page: number, pageSize: number): Promise<{ jobs: JobEntity[], totalJobs: number }> {
        try {
            // Fetch the user and ensure the user exists
            const user = await UserModel.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }

            // Use aggregation for better performance and accurate pagination
            const aggregationResult = await UserModel.aggregate([
                { $match: { _id: user._id } }, // Match the specific user
                {
                    $lookup: { // Populate jobs
                        from: 'jobs',
                        localField: 'jobs',
                        foreignField: '_id',
                        as: 'jobs',
                    }
                },
                { $unwind: '$jobs' },
                {
                    $sort: { 'jobs.createdAt': -1 } 
                },
                {
                    $facet: {
                        paginatedJobs: [
                            { $skip: (page - 1) * pageSize },
                            { $limit: pageSize },
                        ],
                        totalCount: [
                            { $count: 'total' }
                        ],
                    },
                },
            ]);
        

            const result = aggregationResult[0];
            const jobs = result.paginatedJobs || [];
            const totalJobs = result.totalCount[0]?.total || 0;

            const jobEntities = jobs.map((job: any) => new JobEntity(
                job.jobs._id, 
                job.jobs.job_title,
                job.jobs.skills,
                job.jobs.job_role,
                job.jobs.type,
                job.jobs.min_salary,
                job.jobs.max_salary,
                job.jobs.job_level,
                job.jobs.location,
                job.jobs.city,
                job.jobs.description
            ));


            return { jobs: jobEntities, totalJobs };
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Internal server error");
        }
    }

    async update(jobId: string, job: JobEntity): Promise<void> {
        const updatedJob = await JobModel.findByIdAndUpdate(jobId, job, { new: true });
        if (!updatedJob) {
            throw new Error("Job not found or failed to update");
        }
    }

    async delete(jobId: string, userId: string): Promise<void> {
        const job = await JobModel.findById(jobId);
        if (!job) {
            throw new Error("Job not found");
        }

        await UserModel.findByIdAndUpdate(userId, { $pull: { jobs: jobId } });
        await JobModel.findByIdAndDelete(jobId);
    }

}
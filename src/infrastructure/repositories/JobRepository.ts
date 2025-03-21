import { JobEntity } from "../../core/entities/jobEntity";
import { IjobRepository } from "../../core/interfaces/user/IJobRepository";
import { JobModel } from "../data-sources/mongodb/models/Jobs";
import { UserModel } from "../data-sources/mongodb/models/User";


export class JobRepository implements IjobRepository {
    async create(job: JobEntity, userId: string): Promise<void> {
      const newJob = await JobModel.create({ ...job, user: userId });
      await UserModel.findByIdAndUpdate(userId, { $push: { jobs: newJob._id } })
    }

    async findJobsPerIdWithPagination(
        userId: string, 
        page: number, 
        pageSize: number, 
        searchQuery: string = ""
      ): Promise<{ jobs: JobEntity[], totalJobs: number }> {
        const user = await UserModel.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }
      
        const searchMatch = searchQuery
          ? {
              $or: [
                { "jobs.job_title": { $regex: searchQuery, $options: "i" } },
                { "jobs.job_role": { $regex: searchQuery, $options: "i" } },
                { "jobs.skills": { $regex: searchQuery, $options: "i" } },
              ],
            }
          : {};
      
        const aggregationResult = await UserModel.aggregate([
          { $match: { _id: user._id } }, // Match the user by ID
          {
            $lookup: {
              from: "jobs",
              localField: "jobs",
              foreignField: "_id",
              as: "jobs",
            },
          },
          { $unwind: "$jobs" }, 
          { $match: searchMatch }, 
          { $sort: { "jobs.createdAt": -1 } }, 
          {
            $facet: {
              paginatedJobs: [
                { $skip: (page - 1) * pageSize },
                { $limit: pageSize }, 
              ],
              totalCount: [{ $count: "total" }],
            },
          },
        ]);
      
  
        const result = aggregationResult[0];
        const jobs = result.paginatedJobs || [];
        const totalJobs = result.totalCount[0]?.total || 0;
      
        
        const jobEntities = jobs.map((job: any) =>
          new JobEntity(
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
          )
        );
      
        return { jobs: jobEntities, totalJobs };
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

    async findJobsWithoutPagination(userId: string): Promise<JobEntity[]> {
        try {
          const user = await UserModel.findById(userId);
          if (!user) {
            throw new Error("User not found");
          }
    
          const jobs = await JobModel.find({ _id: { $in: user.jobs } });
    
          const jobEntities = jobs.map((job: any) => new JobEntity(
            job._id, 
            job.job_title,
            job.skills,
            job.job_role,
            job.jobType,
            job.min_salary,
            job.max_salary,
            job.job_level,
            job.location,
            job.city,
            job.description
          ));
      
          return jobEntities;
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : "Internal server error");
        }
      }
      
}
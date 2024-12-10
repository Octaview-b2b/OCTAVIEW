import { JobEntity } from "../../entities/jobEntity";
import { IjobRepository } from "../../interfaces/repositories/IJobRepository";


export class JobUseCase{
    constructor(private jobRepository:IjobRepository){}

    async createJob(jobData:JobEntity,userId:string):Promise<void>{
       
        await this.jobRepository.create(jobData,userId)
    }

    async getJobsByUserIdWithPagination(userId: string, page: number): Promise<{ jobs: JobEntity[], hasMore: boolean, nextPage: number | null }> {
        const pageSize = 4; // Set page size to 4 to match the frontend
     
        // Fetch the jobs for the given userId and page
        const { jobs, totalJobs } = await this.jobRepository.findJobsPerIdWithPagination(userId, page, pageSize);
     
        // Check if there are more pages available
        const hasMore = (page * pageSize) < totalJobs;
        const nextPage = hasMore ? page + 1 : null;
     
        // Return the jobs, hasMore flag, and nextPage number
        return { jobs, hasMore, nextPage };
    }
    
    async editJob(jobId: string, jobData: JobEntity): Promise<void> {
        await this.jobRepository.update(jobId, jobData);
    }

    async deleteJob(jobId: string, userId: string): Promise<void> {
        await this.jobRepository.delete(jobId, userId);
    }
}
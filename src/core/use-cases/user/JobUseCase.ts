import { JobEntity } from "../../entities/jobEntity";
import { IjobRepository } from "../../interfaces/user/IJobRepository";


export class JobUseCase{
    constructor(private jobRepository:IjobRepository){}

    async createJob(jobData:JobEntity,userId:string):Promise<void>{
       
        await this.jobRepository.create(jobData,userId)
    }

    async getJobsByUserIdWithPagination(
        userId: string, 
        page: number, 
        searchQuery: string = ""
    ): Promise<{ jobs: JobEntity[], hasMore: boolean, nextPage: number | null }> {
        const pageSize = 4; // Set page size
    
        // Fetch jobs with pagination and optional search query
        const { jobs, totalJobs } = await this.jobRepository.findJobsPerIdWithPagination(
            userId, 
            page, 
            pageSize, 
            searchQuery
        );
    
        const hasMore = (page * pageSize) < totalJobs;
        const nextPage = hasMore ? page + 1 : null;
    
        return { jobs, hasMore, nextPage };
    }
    
    
    async editJob(jobId: string, jobData: JobEntity): Promise<void> {
        await this.jobRepository.update(jobId, jobData);
    }

    async deleteJob(jobId: string, userId: string): Promise<void> {
        await this.jobRepository.delete(jobId, userId);
    }
    async getAllJobsByUserId(userId: string): Promise<JobEntity[]> {
        const jobs = await this.jobRepository.findJobsWithoutPagination(userId);
        return jobs;
    }
}
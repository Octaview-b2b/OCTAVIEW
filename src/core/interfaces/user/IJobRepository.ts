import { JobEntity } from "../../entities/jobEntity";

export interface IjobRepository {
    findJobsWithoutPagination(userId: string): Promise<JobEntity[]>;
    create(job: JobEntity, userId: string): Promise<void>;
    findJobsPerIdWithPagination(userId: string, page: number, pageSize: number): Promise<{ jobs: JobEntity[], totalJobs: number }>;
    update(jobId: string, job: JobEntity): Promise<void>;
    delete(jobId: string, userId: string): Promise<void>;
  }
  
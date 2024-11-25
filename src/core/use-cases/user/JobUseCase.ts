import { JobEntity } from "../../entities/jobEntity";
import { IjobRepository } from "../../interfaces/repositories/IJobRepository";


export class JobUseCase{
    constructor(private jobRepository:IjobRepository){}
    async createJob(jobData:JobEntity,userId:string):Promise<void>{
        await this.jobRepository.create(jobData,userId)
    }
}
import { JobEntity } from "../../entities/jobEntity";

export interface IjobRepository{
    create(job: JobEntity,userId:string): Promise<void>;
}
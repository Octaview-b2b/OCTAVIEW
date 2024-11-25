import { JobEntity } from "../../core/entities/jobEntity";
import { IjobRepository } from "../../core/interfaces/repositories/IJobRepository";
import { JobModel } from "../data-sources/mongodb/models/Jobs";
import { UserModel } from "../data-sources/mongodb/models/User";


export class JobRepository implements IjobRepository{
    async create(job: JobEntity,userId:string): Promise<void> {
       const newJob= await JobModel.create(job)
        await UserModel.findByIdAndUpdate(userId,{$push:{jobs:newJob._id}})
    }
}
import { CandidateEntity } from "../../core/entities/candidateEntity";
import { ICandidate } from "../../core/interfaces/user/ICandidate";
import {CandidateModel} from '../data-sources/mongodb/models/Candidate'
import {JobModel} from '../data-sources/mongodb/models/Jobs'

export class CandidateRepository implements ICandidate{
  async save(jobApplication: CandidateEntity,jobId:any): Promise<void> {
        const newCandidate = await CandidateModel.create(jobApplication) 
        await  JobModel.findByIdAndUpdate(jobId,{$push:{applications:newCandidate._id}})
    }
}
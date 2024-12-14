import { CandidateEntity } from "../../entities/candidateEntity";

export interface ICandidate{
    save(jobApplication:CandidateEntity,jobId:any):Promise<void>
    getData(jobId: any): Promise<CandidateEntity[]>;
}
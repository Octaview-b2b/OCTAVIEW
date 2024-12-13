import {Request,Response} from 'express'
import { CandidateUseCase } from '../../../core/use-cases/user/CandidateUseCase'

export class Candidate_Controller {
    constructor(private candidateUseCase:CandidateUseCase){}

    async apply4Job(req:Request,res:Response):Promise<void>{
        try {
            const {
                fullName,
                dob,
                linkedin,
                profile,
                country,
                email,
                contactNo,
                github,
                jobId,
              } = req.body
              const resume = req.file
              if (!resume) {
                res.status(400).json({ error: "Resume file is required"})
                return
              }

            await this.candidateUseCase.execute(
                fullName,
                dob,
                linkedin,
                profile,
                country,
                email,
                contactNo,
                github,
                resume,
                jobId
            )
            res.status(201).json({ message: "Job application submitted successfully" });
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
        }
    }
}
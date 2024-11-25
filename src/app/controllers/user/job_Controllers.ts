import { Request, Response } from "express";
import { JobUseCase } from "../../../core/use-cases/user/JobUseCase";
import { JobEntity } from "../../../core/entities/jobEntity";

export class JobControllers {
    constructor(private jobUseCase: JobUseCase) { }

    async createJob(req: Request, res: Response): Promise<void> {
        try {
          const { userId } = req.params;
          const { job_title, skills, job_role, type, min_salary, max_salary, job_level, location, city, description } = req.body;
    
          const job = new JobEntity(
            job_title,
            skills,
            job_role,
            type,
            min_salary,
            max_salary,
            job_level,
            location,
            city,
            description
          );
    
          await this.jobUseCase.createJob(job,userId);
          res.status(201).json({ message: "Job created successfully" });
        } catch (error) {
          res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
        }
      }
    
}
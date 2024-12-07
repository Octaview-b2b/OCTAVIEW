import { Request, Response } from "express";
import { JobUseCase } from "../../../core/use-cases/user/JobUseCase";
import { JobEntity } from "../../../core/entities/jobEntity";

export class JobControllers {
    constructor(private jobUseCase: JobUseCase) { }

    async createJob(req: Request, res: Response): Promise<void> {
        try {
          const { userId } = req.params;
          const { job_title, skills, job_role, jobType, min_salary, max_salary, job_level, location, city, description } = req.body;
    
          const job = new JobEntity(
            job_title,
            skills,
            job_role, 
            jobType,
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


  async getJobs(req: Request, res: Response): Promise<Response> {
    try {
        const { userId } = req.params;  // Get userId from query params
        const page = parseInt(req.query.page as string) || 1;  // Default to page 1 if no page param is provided

        if (!userId) {
            return res.status(400).json({ error: "UserId is required" });
        }

        const { jobs, hasMore, nextPage } = await this.jobUseCase.getJobsByUserIdWithPagination(userId as string, page);

        // Send the response in the required format
        return res.status(200).json({
            jobs,
            hasMore,
            nextPage
        });
    } catch (error) {
        return res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
}

    
}
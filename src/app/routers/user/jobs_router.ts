import express from "express";
import { JobControllers } from "../../controllers/user/job_Controllers";
import { JobUseCase } from "../../../core/use-cases/user/JobUseCase";
import { JobRepository } from "../../../infrastructure/repositories/JobRepository";
import asyncHandler from "express-async-handler";
const JobRouter = express.Router()

const jobRepository = new JobRepository()
const jobUsecase = new JobUseCase(jobRepository)
const job_Controllers = new JobControllers(jobUsecase)

JobRouter.post("/:userId",asyncHandler((req, res) => job_Controllers.createJob(req, res)));
JobRouter.get("/:userId", asyncHandler(async (req, res) => {await job_Controllers.getJobs(req, res);}));

export default JobRouter


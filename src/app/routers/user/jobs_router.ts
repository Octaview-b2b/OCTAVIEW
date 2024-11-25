import express from "express";
import { JobControllers } from "../../controllers/user/job_Controllers";
import { JobUseCase } from "../../../core/use-cases/user/JobUseCase";
import { JobRepository } from "../../../infrastructure/repositories/JobRepository";
import asyncHandler from "express-async-handler";
const router = express.Router()

const jobRepository = new JobRepository()
const jobUsecase = new JobUseCase(jobRepository)
const job_Controllers = new JobControllers(jobUsecase)

router.post(
    "/users/:userId/jobs",
    asyncHandler((req, res) => job_Controllers.createJob(req, res))
  );
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const job_Controllers_1 = require("../../controllers/user/job_Controllers");
const JobUseCase_1 = require("../../../core/use-cases/user/JobUseCase");
const JobRepository_1 = require("../../../infrastructure/repositories/JobRepository");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ApikeyValidation_1 = require("../../middlewares/ApikeyValidation");
const AuthMIddleware_1 = require("../../middlewares/AuthMIddleware");
const JobRouter = express_1.default.Router();
const jobRepository = new JobRepository_1.JobRepository();
const jobUsecase = new JobUseCase_1.JobUseCase(jobRepository);
const job_Controllers = new job_Controllers_1.JobControllers(jobUsecase);
JobRouter.post("/:userId", AuthMIddleware_1.authenticateUser, (0, express_async_handler_1.default)((req, res) => job_Controllers.createJob(req, res)));
JobRouter.get("/:userId", AuthMIddleware_1.authenticateUser, (0, express_async_handler_1.default)(async (req, res) => { await job_Controllers.getJobs(req, res); }));
JobRouter.put("/:jobId/:userId", AuthMIddleware_1.authenticateUser, (0, express_async_handler_1.default)((req, res) => job_Controllers.editJob(req, res)));
JobRouter.delete("/:jobId/:userId", AuthMIddleware_1.authenticateUser, (0, express_async_handler_1.default)((req, res) => job_Controllers.deleteJob(req, res)));
JobRouter.get("/ext/:userId", ApikeyValidation_1.checkApiKey, (0, express_async_handler_1.default)(async (req, res) => {
    await job_Controllers.getAllJobs(req, res);
}));
exports.default = JobRouter;

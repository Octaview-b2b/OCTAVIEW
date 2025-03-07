"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateRouter = exports.candidateExtRouter = void 0;
const express_1 = __importDefault(require("express"));
const CandidateRepository_1 = require("../../../infrastructure/repositories/CandidateRepository");
const CandidateUseCase_1 = require("../../../core/use-cases/user/CandidateUseCase");
const candidate_Controllers_1 = require("../../controllers/user/candidate_Controllers");
const MulterSetup_1 = require("../../middlewares/MulterSetup");
const ApikeyValidation_1 = require("../../middlewares/ApikeyValidation");
const AuthMIddleware_1 = require("../../middlewares/AuthMIddleware");
const candidateRepositery = new CandidateRepository_1.CandidateRepository();
const candidateUseCase = new CandidateUseCase_1.CandidateUseCase(candidateRepositery);
const candidate_Controllers = new candidate_Controllers_1.Candidate_Controller(candidateUseCase);
const candidateExtRouter = express_1.default.Router();
exports.candidateExtRouter = candidateExtRouter;
const candidateRouter = express_1.default.Router();
exports.candidateRouter = candidateRouter;
candidateRouter.get('/:jobId/', AuthMIddleware_1.authenticateUser, (req, res) => candidate_Controllers.getCandidate(req, res));
// external from/to npm
candidateExtRouter.post('/:userId/:jobId', ApikeyValidation_1.checkApiKey, MulterSetup_1.uploadResume, (req, res) => {
    candidate_Controllers.apply4Job(req, res);
});

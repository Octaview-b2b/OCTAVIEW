"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectedCandidateRoutes = void 0;
// Inside your routes setup (e.g., SelectedCandidateRoutes.ts)
const express_1 = __importDefault(require("express"));
const SelectedCandidateRepository_1 = require("../../../infrastructure/repositories/SelectedCandidateRepository");
const SelectedCandidateUseCase_1 = require("../../../core/use-cases/user/SelectedCandidateUseCase");
const SelectedCandidate_Controllers_1 = require("../../controllers/user/SelectedCandidate_Controllers");
const EmailService_1 = require("../../../utils/EmailService");
const emailService = new EmailService_1.EmailService();
const selectedCandidateRepository = new SelectedCandidateRepository_1.SelectedCandidateRepository();
const selectedCandidateUseCase = new SelectedCandidateUseCase_1.SelectedCandidateUseCase(selectedCandidateRepository, emailService);
const selectedCandidateController = new SelectedCandidate_Controllers_1.SelectedCandidateController(selectedCandidateUseCase);
const selectedCandidateRoutes = express_1.default.Router();
exports.selectedCandidateRoutes = selectedCandidateRoutes;
selectedCandidateRoutes.post("/", selectedCandidateController.selectCandidate);
selectedCandidateRoutes.get("/:jobId", selectedCandidateController.getSelectedCandidates);
selectedCandidateRoutes.delete("/:candidateId", selectedCandidateController.rejectCandidate);
selectedCandidateRoutes.put("/:selectedCandidateId", selectedCandidateController.updateInterviewDateTime);
selectedCandidateRoutes.get('/scheduled-interviews/:userId', selectedCandidateController.getScheduledInterviewsByUserId);

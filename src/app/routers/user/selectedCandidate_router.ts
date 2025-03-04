// Inside your routes setup (e.g., SelectedCandidateRoutes.ts)
import express from "express"; 
import { SelectedCandidateRepository } from "../../../infrastructure/repositories/SelectedCandidateRepository";
import { SelectedCandidateUseCase } from "../../../core/use-cases/user/SelectedCandidateUseCase";
import { SelectedCandidateController } from "../../controllers/user/SelectedCandidate_Controllers";
import { EmailService } from "../../../utils/EmailService";

const emailService = new EmailService();

const selectedCandidateRepository = new SelectedCandidateRepository();
const selectedCandidateUseCase = new SelectedCandidateUseCase(selectedCandidateRepository,emailService);
const selectedCandidateController = new SelectedCandidateController(selectedCandidateUseCase);

const selectedCandidateRoutes = express.Router();

selectedCandidateRoutes.post("/", selectedCandidateController.selectCandidate);
selectedCandidateRoutes.get("/:jobId", selectedCandidateController.getSelectedCandidates);
selectedCandidateRoutes.delete("/:candidateId",selectedCandidateController.rejectCandidate);
selectedCandidateRoutes.put("/:selectedCandidateId",selectedCandidateController.updateInterviewDateTime);
selectedCandidateRoutes.get('/scheduled-interviews/:userId', selectedCandidateController.getScheduledInterviewsByUserId);

export { selectedCandidateRoutes };

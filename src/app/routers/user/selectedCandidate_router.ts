// Inside your routes setup (e.g., SelectedCandidateRoutes.ts)
import express from "express"; 
import { SelectedCandidateRepository } from "../../../infrastructure/repositories/SelectedCandidateRepository";
import { SelectedCandidateUseCase } from "../../../core/use-cases/user/SelectedCandidateUseCase";
import { SelectedCandidateController } from "../../controllers/user/SelectedCandidate_Controllers";

const selectedCandidateRepository = new SelectedCandidateRepository();
const selectedCandidateUseCase = new SelectedCandidateUseCase(selectedCandidateRepository);
const selectedCandidateController = new SelectedCandidateController(selectedCandidateUseCase);

const selectedCandidateRoutes = express.Router();

selectedCandidateRoutes.post("/", selectedCandidateController.selectCandidate);
selectedCandidateRoutes.get("/:jobId", selectedCandidateController.getSelectedCandidates);
selectedCandidateRoutes.delete("/:candidateId",selectedCandidateController.rejectCandidate);
selectedCandidateRoutes.put("/:selectedCandidateId",selectedCandidateController.updateInterviewDateTime);

export { selectedCandidateRoutes };

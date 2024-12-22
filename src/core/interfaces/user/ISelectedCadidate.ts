import { SelectedCandidateEntity } from "../../entities/selectedCandidateEntity";

export interface ISelectedCandidateRepository {
    save(selectedCandidate: SelectedCandidateEntity): Promise<void>;
    getByJobId(jobId: string): Promise<SelectedCandidateEntity[]>;
    isCandidateSelected(candidateId: string, jobId: string): Promise<boolean>;
    updateSelectionStatus(candidateId: string): Promise<void> 
    deleteSelectedCandidate(candidateId: string): Promise<void>
  }
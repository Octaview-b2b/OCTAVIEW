import { ISelectedCandidateRepository } from "../../../core/interfaces/user/ISelectedCadidate";
import { SelectedCandidateEntity } from "../../entities/selectedCandidateEntity";

export class SelectedCandidateUseCase {
  constructor(private selectedCandidateRepository: ISelectedCandidateRepository) {}

  async selectCandidate(
    candidateId: string,
    jobId: string,
    meetUrl: string = "",
    report: string = "",
    status: "hired" | "rejected" | "onhold" = "onhold"
  ): Promise<void> {
    const isAlreadySelected = await this.selectedCandidateRepository.isCandidateSelected(candidateId, jobId);

    if (isAlreadySelected) {
      throw new Error("Candidate is already selected for this job.");
    }

    const selectedCandidate = SelectedCandidateEntity.create(
      candidateId,
      jobId,
      null,
      meetUrl,
      report,
      status
    );
    await this.selectedCandidateRepository.save(selectedCandidate);
    await this.selectedCandidateRepository.updateSelectionStatus(candidateId);
  }

  async getSelectedCandidates(jobId: string): Promise<SelectedCandidateEntity[]> {
    return await this.selectedCandidateRepository.getByJobId(jobId);
  }

  async deleteSelectedCandidate(candidateId: string): Promise<void> {
    try {
        await this.selectedCandidateRepository.deleteSelectedCandidate(candidateId);
      } catch (error) {
        console.error("Error rejecting candidate:", error);
        throw new Error("Failed to reject candidate.");
      }
    }
}

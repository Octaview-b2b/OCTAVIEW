import { ISelectedCandidateRepository } from "../../../core/interfaces/user/ISelectedCadidate";
import { SelectedCandidateEntity } from "../../entities/selectedCandidateEntity";
import { EmailService } from "../../../utils/EmailService";
import { emailTemplates } from "../../../utils/EmailTemp";

export class SelectedCandidateUseCase {
  constructor(private selectedCandidateRepository: ISelectedCandidateRepository, private emailService:EmailService ) { }
  async selectCandidate(
    candidateId: string, 
    jobId: string, 
    report: string = "", 
    status: "scheduled" | "hired" | "rejected" | "shortlisted"|""
): Promise<void> {
    const isAlreadySelected = await this.selectedCandidateRepository.isCandidateSelected(candidateId, jobId);

    if (isAlreadySelected) {
        throw new Error("Candidate is already selected for this job.");
    }
    const { candidateName, jobTitle, companyName,email } = await this.selectedCandidateRepository.getDataForEmail(candidateId);

    const selectedCandidate = SelectedCandidateEntity.create(
        candidateId,
        jobId,
        "",
        "",
        report,
        "shortlisted"
    );

    await this.selectedCandidateRepository.save(selectedCandidate);
    await this.selectedCandidateRepository.updateSelectionStatus(candidateId);

    //  email content
    const emailSubject = `Congratulations! You have been shortlisted for ${jobTitle}`;
    const emailBody = emailTemplates.shortlisted(candidateName, jobTitle, companyName);

    await this.emailService.sendEmail(
        email,
        emailSubject,
        emailBody
    );
}


  async getSelectedCandidates(jobId: string): Promise<SelectedCandidateEntity[]> {
    return await this.selectedCandidateRepository.getByJobId(jobId);
  }

  async deleteSelectedCandidate(candidateId: string): Promise<void> {
    try {
        // Fetch candidate details for email
        const emailData = await this.selectedCandidateRepository.getDataForEmail(candidateId);

        if (!emailData.email) {
            throw new Error("Candidate email not found.");
        }

        await this.selectedCandidateRepository.deleteSelectedCandidate(candidateId);

        const emailTemplate = emailTemplates.rejected(emailData.candidateName, emailData.jobTitle, emailData.companyName);
        await this.emailService.sendEmail(
            emailData.email,
            `Application Update - ${emailData.jobTitle} at ${emailData.companyName}`,
            emailTemplate
        );

    } catch (error) {
        console.error("Error rejecting candidate:", error);
        throw new Error("Failed to reject candidate.");
    }
}


async updateInterviewDateTimeUseCase(
  selectedCandidateId: string,
  interviewDate: string,
  interviewTime: string
): Promise<void> {
  try {
      console.log('updateInterviewDateTimeUsecase:', selectedCandidateId, interviewDate, interviewTime);
      
      // Fetch candidate details for email
      const emailData = await this.selectedCandidateRepository.getDataForEmail(selectedCandidateId);

      if (!emailData.email) {
          throw new Error("Candidate email not found.");
      }

      // Update interview date and time in repository
      await this.selectedCandidateRepository.updateInterviewDateTimeRepo(selectedCandidateId, interviewDate, interviewTime);

      // Prepare interview schedule email template
      const emailTemplate = emailTemplates.interviewScheduled(
          emailData.candidateName,
          emailData.jobTitle,
          emailData.companyName,
          interviewDate,
          interviewTime
      );

      // Send interview notification email
      await this.emailService.sendEmail(
          emailData.email,
          `Interview Scheduled for ${emailData.jobTitle} at ${emailData.companyName}`,
          emailTemplate
      );

  } catch (error) {
      console.error("Error in updating interview date and time:", error);
      throw new Error("Failed to update interview date and time.");
  }
}


  async getScheduledInterviewsByUserId(userId: string): Promise<any[]> {
    try {
      const scheduledInterviews = await this.selectedCandidateRepository.getScheduledInterviewsByUserId(userId);
      return scheduledInterviews;
    } catch (error) {
      console.error("Error in getting scheduled interviews:", error);
      throw new Error("Failed to fetch scheduled interviews.");
    }
  }
}

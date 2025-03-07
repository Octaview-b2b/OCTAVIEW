"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectedCandidateUseCase = void 0;
const selectedCandidateEntity_1 = require("../../entities/selectedCandidateEntity");
const EmailTemp_1 = require("../../../utils/EmailTemp");
class SelectedCandidateUseCase {
    constructor(selectedCandidateRepository, emailService) {
        this.selectedCandidateRepository = selectedCandidateRepository;
        this.emailService = emailService;
    }
    async selectCandidate(candidateId, jobId, report = "", status, meetUrl) {
        const isAlreadySelected = await this.selectedCandidateRepository.isCandidateSelected(candidateId, jobId);
        if (isAlreadySelected) {
            throw new Error("Candidate is already selected for this job.");
        }
        const { candidateName, jobTitle, companyName, email } = await this.selectedCandidateRepository.getDataForEmail(candidateId);
        const selectedCandidate = selectedCandidateEntity_1.SelectedCandidateEntity.create(candidateId, jobId, meetUrl || "", // Default empty if undefined
        status || "", // Default empty if undefined
        report, "shortlisted");
        await this.selectedCandidateRepository.save(selectedCandidate);
        await this.selectedCandidateRepository.updateSelectionStatus(candidateId);
        // Email content
        const emailSubject = `Congratulations! You have been shortlisted for ${jobTitle}`;
        const emailBody = EmailTemp_1.emailTemplates.shortlisted(candidateName, jobTitle, companyName);
        await this.emailService.sendEmail(email, emailSubject, emailBody);
    }
    async getSelectedCandidates(jobId) {
        return await this.selectedCandidateRepository.getByJobId(jobId);
    }
    async deleteSelectedCandidate(candidateId) {
        try {
            // Fetch candidate details for email
            const emailData = await this.selectedCandidateRepository.getDataForEmail(candidateId);
            if (!emailData.email) {
                throw new Error("Candidate email not found.");
            }
            await this.selectedCandidateRepository.deleteSelectedCandidate(candidateId);
            const emailTemplate = EmailTemp_1.emailTemplates.rejected(emailData.candidateName, emailData.jobTitle, emailData.companyName);
            await this.emailService.sendEmail(emailData.email, `Application Update - ${emailData.jobTitle} at ${emailData.companyName}`, emailTemplate);
        }
        catch (error) {
            console.error("Error rejecting candidate:", error);
            throw new Error("Failed to reject candidate.");
        }
    }
    async updateInterviewDateTimeUseCase(selectedCandidateId, interviewDate, interviewTime) {
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
            const emailTemplate = EmailTemp_1.emailTemplates.interviewScheduled(emailData.candidateName, emailData.jobTitle, emailData.companyName, interviewDate, interviewTime);
            // Send interview notification email
            await this.emailService.sendEmail(emailData.email, `Interview Scheduled for ${emailData.jobTitle} at ${emailData.companyName}`, emailTemplate);
        }
        catch (error) {
            console.error("Error in updating interview date and time:", error);
            throw new Error("Failed to update interview date and time.");
        }
    }
    async getScheduledInterviewsByUserId(userId) {
        try {
            const scheduledInterviews = await this.selectedCandidateRepository.getScheduledInterviewsByUserId(userId);
            return scheduledInterviews;
        }
        catch (error) {
            console.error("Error in getting scheduled interviews:", error);
            throw new Error("Failed to fetch scheduled interviews.");
        }
    }
}
exports.SelectedCandidateUseCase = SelectedCandidateUseCase;

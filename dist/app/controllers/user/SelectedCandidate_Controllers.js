"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectedCandidateController = void 0;
class SelectedCandidateController {
    constructor(selectedCandidateUseCase) {
        this.selectedCandidateUseCase = selectedCandidateUseCase;
        this.selectCandidate = async (req, res) => {
            try {
                const { candidateId, jobId, meetUrl, report, status } = req.body;
                await this.selectedCandidateUseCase.selectCandidate(candidateId, jobId, meetUrl || "", report || "", status || "");
                res.status(200).json({ message: "Candidate selected successfully." });
            }
            catch (error) {
                res.status(500).json({
                    error: error instanceof Error ? error.message : "Internal server error",
                });
            }
        };
        this.getSelectedCandidates = async (req, res) => {
            try {
                const { jobId } = req.params;
                const selectedCandidates = await this.selectedCandidateUseCase.getSelectedCandidates(jobId);
                console.log('get selected candidateata', selectedCandidates);
                res.status(200).json(selectedCandidates);
            }
            catch (error) {
                res.status(500).json({
                    error: error instanceof Error ? error.message : "Internal server error",
                });
            }
        };
        this.rejectCandidate = async (req, res) => {
            try {
                const { candidateId } = req.params;
                await this.selectedCandidateUseCase.deleteSelectedCandidate(candidateId);
                res.status(200).json({ message: "Candidate rejected successfully" });
            }
            catch (error) {
                error instanceof Error ? error.message : "Internal server error";
            }
        };
        this.updateInterviewDateTime = async (req, res) => {
            const { selectedCandidateId } = req.params;
            const { interviewDate, interviewTime } = req.body;
            console.log('updateInterviewDateTime', selectedCandidateId, interviewDate, interviewTime);
            try {
                await this.selectedCandidateUseCase.updateInterviewDateTimeUseCase(selectedCandidateId, interviewDate, interviewTime);
                console.log(`Successfully updated interview date and time for candidate: ${selectedCandidateId}`);
                res.status(200).json({ message: "Interview date and time updated successfully." });
            }
            catch (error) {
                console.error("Error in updating interview date and time:", error);
                res.status(500).json({ message: error instanceof Error ? error.message : "Internal server error" });
            }
        };
        this.getScheduledInterviewsByUserId = async (req, res) => {
            try {
                const { userId } = req.params; // Extract userId from request parameters
                const scheduledInterviews = await this.selectedCandidateUseCase.getScheduledInterviewsByUserId(userId);
                console.log('Scheduled Interviews:', scheduledInterviews);
                if (scheduledInterviews.length === 0) {
                    res.status(404).json({ message: "No scheduled interviews found for this user." });
                }
                else {
                    res.status(200).json(scheduledInterviews);
                }
            }
            catch (error) {
                res.status(500).json({
                    error: error instanceof Error ? error.message : "Internal server error",
                });
            }
        };
    }
}
exports.SelectedCandidateController = SelectedCandidateController;

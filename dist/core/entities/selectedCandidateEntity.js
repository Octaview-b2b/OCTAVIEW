"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectedCandidateEntity = void 0;
class SelectedCandidateEntity {
    constructor(candidate, job, date, time, report, status) {
        this.candidate = candidate;
        this.job = job;
        this.date = date;
        this.time = time;
        this.report = report;
        this.status = status;
    }
    static create(candidate, job, time, date, report, status) {
        return new SelectedCandidateEntity(candidate, job, date, time, report, status);
    }
}
exports.SelectedCandidateEntity = SelectedCandidateEntity;

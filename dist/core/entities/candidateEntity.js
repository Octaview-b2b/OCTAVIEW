"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateEntity = void 0;
class CandidateEntity {
    constructor(id, // Add `id`
    fullName, DOB, linkedin, country, email, contactNo, github, resumeUrl) {
        this.id = id;
        this.fullName = fullName;
        this.DOB = DOB;
        this.linkedin = linkedin;
        this.country = country;
        this.email = email;
        this.contactNo = contactNo;
        this.github = github;
        this.resumeUrl = resumeUrl;
    }
    static create(id, fullName, DOB, linkedin, country, email, contactNo, github, resumeUrl) {
        return new CandidateEntity(id, fullName, DOB, linkedin, country, email, contactNo, github, resumeUrl);
    }
}
exports.CandidateEntity = CandidateEntity;

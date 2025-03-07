"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobEntity = void 0;
class JobEntity {
    constructor(id, job_title, skills, job_role, jobType, min_salary, max_salary, job_level, location, city, description, hidden = false) {
        this.id = id;
        this.job_title = job_title;
        this.skills = skills;
        this.job_role = job_role;
        this.jobType = jobType;
        this.min_salary = min_salary;
        this.max_salary = max_salary;
        this.job_level = job_level;
        this.location = location;
        this.city = city;
        this.description = description;
        this.hidden = hidden;
    }
}
exports.JobEntity = JobEntity;

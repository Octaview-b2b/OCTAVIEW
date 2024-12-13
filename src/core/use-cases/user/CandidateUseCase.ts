import { ICandidate } from "../../interfaces/user/ICandidate";
import { CandidateEntity } from "../../entities/candidateEntity";
import { uploadResumeToS3 } from "../../../config/awsConfig";

export class CandidateUseCase {
    constructor(private CandidateRepository: ICandidate) { }

    async execute(fullName: string,
        dob: string,
        linkedin: string,
        profile: string,
        country: string,
        email: string,
        contactNo: string,
        github: string,
        resume: Express.Multer.File,
        jobId: string): Promise<void> {

        const resumeUrl = await uploadResumeToS3(resume)
        const jobApplication = CandidateEntity.create(
            fullName,
            dob,
            linkedin,
            profile,
            country,
            email,
            contactNo,
            github,
            resumeUrl)
        await this.CandidateRepository.save(jobApplication,jobId)


    }
}
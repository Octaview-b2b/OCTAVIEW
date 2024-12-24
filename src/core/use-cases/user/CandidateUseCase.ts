import { uploadResumeToS3 } from '../../../config/awsConfig';
import { CandidateEntity } from '../../entities/candidateEntity';
import { ICandidate } from '../../interfaces/user/ICandidate';

export class CandidateUseCase {
  constructor(private candidateRepository: ICandidate) {}

  async execute(jobApplicationDetails: any, resume: any): Promise<void> {
    try {
      const resumeUrl = await uploadResumeToS3(resume);
      const jobApplication = CandidateEntity.create(
        jobApplicationDetails.jobId,
        jobApplicationDetails.fullName,
        jobApplicationDetails.DOB,
        jobApplicationDetails.linkedin,
        jobApplicationDetails.country,
        jobApplicationDetails.email,
        jobApplicationDetails.contactNo,
        jobApplicationDetails.github,
        resumeUrl
      );

      await this.candidateRepository.save(jobApplication, jobApplicationDetails.jobId);
    } catch (error) {
      console.error('Error in CandidateUseCase:', error);
      throw new Error('Error during candidate job application processing.');
    }
  }
  async getApplications(jobId:string):Promise<CandidateEntity[]>{
    console.log('jobId::::::',jobId);
    
      return await this.candidateRepository.getData(jobId)
  }
}

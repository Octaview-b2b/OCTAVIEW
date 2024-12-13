// entities/JobApplication.ts

export class CandidateEntity {
    constructor(
      public fullName: string,
      public dob: string,
      public linkedin: string,
      public profile: string,
      public country: string,
      public email: string,
      public contactNo: string,
      public github: string,
      public resumeUrl: string,
    ) {}
  
    static create(
      fullName: string,
      dob: string,
      linkedin: string,
      profile: string,
      country: string,
      email: string,
      contactNo: string,
      github: string,
      resumeUrl: string,
    ): CandidateEntity {
      return new CandidateEntity(
        fullName,
        dob,
        linkedin,
        profile,
        country,
        email,
        contactNo,
        github,
        resumeUrl,
      );
    }
  }
  
export class CandidateEntity {
  constructor(
    public id: string,
    public fullName: string,
    public DOB: string,
    public linkedin: string,
    public country: string,
    public email: string,
    public contactNo: string,
    public github: string,
    public resumeUrl: string
  ) { }

  static create(
    id: string,
    fullName: string,
    DOB: string,
    linkedin: string,
    country: string,
    email: string,
    contactNo: string,
    github: string,
    resumeUrl: string
  ): CandidateEntity {
    return new CandidateEntity(
      id,
      fullName,
      DOB,
      linkedin,
      country,
      email,
      contactNo,
      github,
      resumeUrl
    );
  }
}

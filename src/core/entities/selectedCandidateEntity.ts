export class SelectedCandidateEntity {
    constructor(
      public candidate: string,
      public job: string,
      public date: Date|null,
      public meetUrl: string,
      public report: string,
      public status: "hired" | "rejected" | "onhold"
    ) {}
  
    static create(
      candidate: string,
      job: string,
      date: Date | null = null,  
      meetUrl: string,
      report: string,
      status: "hired" | "rejected" | "onhold"
    ): SelectedCandidateEntity {
      return new SelectedCandidateEntity(candidate, job, date, meetUrl, report, status);
    }
    
  }
  
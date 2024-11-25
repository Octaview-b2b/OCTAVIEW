export class JobEntity {
    constructor(
      public job_title: string,
      public skills: string[],
      public job_role: string,
      public type: string,
      public min_salary: number,
      public max_salary: number,
      public job_level: string,
      public location: string,
      public city: string,
      public description: string,
      public hidden: boolean = false
    ) {}
  }
  
export class SelectedCandidateEntity {
  constructor(
    public candidate: string,
    public job: string,
    public date: string,
    public time: string,
    public report: string,
    public status: "scheduled"|"hired" | "rejected" | "shortlisted"|""
  ) {}

  static create(
    candidate: string, job: string, time: string, date: string, report: string, status: "scheduled" | "hired" | "rejected" | "shortlisted"|""
): SelectedCandidateEntity {
    return new SelectedCandidateEntity(candidate, job, date, time, report, status);
}

}

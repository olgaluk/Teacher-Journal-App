export class Subject {
  subject: string;
  cabinet: number;
  description: string;
  teachersID: string[];

  constructor(
    subject: string,
    cabinet: number,
    description: string
  ) {
    this.subject = subject;
    this.cabinet = cabinet;
    this.description = description;
  }
}
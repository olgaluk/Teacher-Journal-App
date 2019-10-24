export class Subject {
  subject: string;
  cabinet: number;
  description: string;
  teachersID: string[];

  constructor(
    subject: string,
    cabinet: number,
    teachersID: string[],
    description: string
  ) {
    this.subject = subject;
    this.cabinet = cabinet;
    this.description = description;
    this.teachersID = teachersID;
  }
}
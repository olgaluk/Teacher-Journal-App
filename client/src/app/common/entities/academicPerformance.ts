import { Mark } from './mark';

export class AcademicPerformance {
  marks: Mark[];

  constructor(
    public subjectId: string,
    public teacherId: string
  ) {
    this.marks = [];
  }
}

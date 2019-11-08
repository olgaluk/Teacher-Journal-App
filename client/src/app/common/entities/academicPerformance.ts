import { Mark } from './mark';

export class AcademicPerformance {
  marks: Mark[];

  constructor(
    public subjectId: number,
    public teacherId: number
  ) {
    this.marks = [];
  }
}

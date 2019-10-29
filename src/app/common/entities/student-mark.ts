import { Mark } from './mark';

export class StudentMark {
  studentId: number;
  marks: Mark[] = [];

  constructor(
    studentId: number,
    marks: Mark[]
  ) {
    this.studentId = studentId;
    this.marks = marks;
  }
}
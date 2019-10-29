import { Mark } from './mark';

export class StudentNameAndMarks {
  studentName: string;
  studentLastName: string;
  marks: Mark[] = [];

  constructor(
    studentName: string,
    studentLastName: string,
    marks: Mark[]
  ) {
    this.studentName = studentName;
    this.studentLastName = studentLastName;
    this.marks = marks;
  }
}
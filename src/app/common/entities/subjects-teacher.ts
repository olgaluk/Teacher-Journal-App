import { StudentMark } from './student-mark';

export class SubjectsTeacher {
  name: string;
  studentsInfo: StudentMark[] = [];

  constructor(
    name: string,
    studentsInfo: StudentMark[]
  ) {
    this.name = name;
    this.studentsInfo = studentsInfo;
  }
}

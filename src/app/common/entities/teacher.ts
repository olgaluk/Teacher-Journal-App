import { SubjectsTeacher } from './subjects-teacher';

export class Teacher {
  id: string;
  teacherName: string;
  teacherLastName: string;
  subjects: SubjectsTeacher[];

  constructor(
    id: string,
    teacherName: string,
    teacherLastName: string
  ) {
    this.id = id;
    this.teacherName = teacherName;
    this.teacherLastName = teacherLastName;
    this.subjects = [];
  }
}
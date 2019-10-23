import { Student } from '../entities/student';
import { STUDENTS } from '../constants/constants-student';

import { Subject } from '../entities/subject';
import { SUBJECTS } from '../constants/constants-subject';

export class DataService {

  private dataStudents: Student[] = STUDENTS;
  private dataSubjects: Subject[] = SUBJECTS;

  getDataStudents(): Student[] {
    return this.dataStudents;
  }

  addDataStudent(
    id: number,
    name: string,
    lastName: string,
    age: number,
    address: string
  ): void {
    if (name == null || lastName == null || name.trim() == "" || id == null || age == null)
      return;
    this.dataStudents.push(new Student(id, name, lastName, age, address));
  }

  getDataSubjects(): Subject[] {
    return this.dataSubjects;
  }

  addDataSubject(
    subject: string,
    cabinet: number,
    description: string
  ): void {
    if (subject == null)
      return;
    this.dataSubjects.push(new Subject(subject, cabinet, description));
  }
}
import { Student } from '../entities/student';
import { STUDENTS } from '../constants/constants-student';

import { Subject } from '../entities/subject';
import { SUBJECTS } from '../constants/constants-subject';

import { Teacher } from '../entities/teacher';
import { TEACHER } from '../constants/constants-teacher';

export class DataService {

  private dataStudents: Student[] = STUDENTS;
  private dataSubjects: Subject[] = SUBJECTS;
  private dataTeachers: Teacher[] = TEACHER;

  getDataStudents(): Student[] {
    return this.dataStudents;
  }

  getDataTeachers(): Teacher[] {
    return this.dataTeachers;
  }

  getDataStudent(studentId: number) {
    return this.dataStudents.find(student => student.id === studentId);
  }

  addDataNewStudent(
    name: string,
    lastName: string,
    age: number,
    address: string
  ): void {
    if (name == null || lastName == null || name.trim() == "" || age == null)
      return;
    const idStudent: number = this.dataStudents.length > 0 ? Math.max(...this.dataStudents.map(student => student.id)) + 1 : 0;
    this.dataStudents.push(new Student(idStudent, name, lastName, age, address));
  }

  getDataSubjects(): Subject[] {
    return this.dataSubjects;
  }

  addDataNewSubject(
    subject: string,
    cabinet: number,
    teachersID: string[],
    description: string
  ): void {
    if (subject == null)
      return;
    this.dataSubjects.push(new Subject(subject, cabinet, teachersID, description));

    if (teachersID.length) {
      teachersID.map(id => {

        this.dataTeachers.forEach((teacher) => {
          if (teacher.id === id) teacher.subjects.push({
            "name": subject,
            "studentsInfo": []
          });
        });

      });
    }
  }

  getDataTeachersFromSubject(id: string) {
    const listIdTeachers = this.dataSubjects.find(subject => subject.subject === id).teachersID;
    const listTeachers = listIdTeachers
      .map(teacherId => this.dataTeachers.find(teacher => teacher.id === teacherId))
      .filter(teacher => teacher);
    return listTeachers;
  }

  getDataTeacher(idTeacher: string) {
    return this.dataTeachers.find(teacher => teacher.id === idTeacher);
  }

  getDataSubjectInfo(subject: string) {
    return this.dataSubjects.find(subjectItem => subjectItem.subject === subject);
  }

  getDataStudentsFromTeacher(idTeacher: string, subject: string) {
    const teacherInfo = this.getDataTeacher(idTeacher);
    const teacherInfoSubjects = teacherInfo.subjects;
    const teacherInfoSubject = teacherInfoSubjects.find(subjectInfo => subjectInfo.name === subject);
    const studentsInfoName = teacherInfoSubject.studentsInfo.map(studentMarks => {
      const studentId = studentMarks.studentId;
      const student = this.getDataStudent(studentId);
      return {
        "studentName": student.name,
        "studentLastName": student.lastName,
        "marks": studentMarks.marks
      }
    })
    return studentsInfoName;
  }
}

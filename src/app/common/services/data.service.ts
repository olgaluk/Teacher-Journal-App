import { Student } from '../entities/student';
import { STUDENTS } from '../constants/constants-student';

import { Subject } from '../entities/subject';
import { SUBJECTS } from '../constants/constants-subject';

import { Teacher } from '../entities/teacher';
import { TEACHER } from '../constants/constants-teacher';

import { Mark } from '../entities/mark';
import { StudentMark } from '../entities/student-mark';

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

  addNewDateForMarks(idTeacher: string, newIdTeacher: string, subject: string,
    newStudentsInfo: StudentMark[]
  ) {
    const studentsInfo = newStudentsInfo.map(studentInfo => {
      return {
        "studentId": studentInfo.studentId,
        "marks": studentInfo.marks.map(mark => {
          return { "date": mark.date, "mark": mark.mark };
        })
      }
    });

    const teacher = this.getDataTeacher(idTeacher);
    if (idTeacher === newIdTeacher) {
      teacher.subjects.forEach(subjectInfo => {
        if (subjectInfo.name === subject) {
          subjectInfo.studentsInfo = studentsInfo;
        }
      });
    } else {
      let numberSubject: number;
      teacher.subjects.forEach((subjectInfo, index) => {
        if (subjectInfo.name === subject) {
          numberSubject = index;
        }
      });
      teacher.subjects.splice(numberSubject, 1);
      const newTeacher = this.getDataTeacher(newIdTeacher);
      newTeacher.subjects.push({
        "name": subject,
        studentsInfo
      });
      const subjectInfo = this.getDataSubjectInfo(subject);
      subjectInfo.teachersID.splice(subjectInfo.teachersID.indexOf(idTeacher), 1, newIdTeacher);
      const studentsId = studentsInfo.map(studentInfo => studentInfo.studentId);
      this.dataStudents.forEach(student => {
        if (studentsId.includes(student.id)) {

          student.subject.forEach(subjectInfo => {
            if (subjectInfo.name === subject && subjectInfo.teacherId === idTeacher) {
              subjectInfo.teacherId = newIdTeacher;
            }
          });

        }
      });
    }
  }

  getTeachersExceptThisSubject(teachers: string[]) {
    const teachersExceptThisSubject = this.dataTeachers.filter(teacher => !teachers.includes(teacher.id));
    return teachersExceptThisSubject;
  }

  getDataAllStudentMarks() {
    const students = this.getDataStudents();
    const studentsInfo = students.map(student => {
      const studentMarksAll = student.subject.map(subjectInfo => {
        const teacher = this.getDataTeacher(subjectInfo.teacherId);
        const studentMarks = teacher.subjects
          .find(subject => subject.name === subjectInfo.name)
          .studentsInfo
          .find(studentInfo => studentInfo.studentId === student.id)
          .marks.map(markInfo => markInfo.mark);

        return studentMarks;
      });
      return {
        "studentName": student.name,
        "studentLastName": student.lastName,
        "studentAllMarks": studentMarksAll
          .map(mark => mark)
          .reduce((acc, currentValue) => acc.concat(currentValue), [])
      };

    });
    return studentsInfo;
  }
}

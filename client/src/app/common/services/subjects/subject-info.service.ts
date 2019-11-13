import { Injectable } from '@angular/core';

import { Student } from '../../entities/student';

@Injectable()
export class SubjectInfoService {

  getDates(
    students: Student[],
    teacherId: string,
    subjectId: string
  ): string[] {
    let dates = [];
    students
      .forEach(student => {
        student.academicPerformance
          .forEach(studentInfo => {
            if (studentInfo.subjectId === subjectId
              && studentInfo.teacherId === teacherId) {
              studentInfo.marks.forEach(mark => dates.push(mark.date));
            }
          });
      });
    dates = Array.from(new Set(dates));
    if (dates.includes("")) {
      dates.splice(dates.indexOf(""), 1);
      dates = dates
        .map(date => (new Date(date)).getTime())
        .sort((a, b) => a - b)
        .map(date => (new Date(date)).toDateString());
      dates.push("");
    } else {
      dates = dates
        .map(date => (new Date(date)).getTime())
        .sort((a, b) => a - b)
        .map(date => (new Date(date)).toDateString());
    }

    return dates;
  }

  getStudentMarks(
    studentId: string,
    subjectId: string,
    teacherId: string,
    students: Student[]
  ): number[] {
    let marks = [];
    const student = students
      .find(student => student._id === studentId);
    student.academicPerformance
      .forEach(studentInfo => {
        if (studentInfo.subjectId === subjectId
          && studentInfo.teacherId === teacherId) {
          studentInfo.marks.forEach(mark => marks.push(mark.value));
        }
      });

    return marks;
  }

  getMark(
    studentId: string,
    date: string,
    subjectId: string,
    teacherId: string,
    students: Student[]
  ): number | string {
    let markValue;
    const student = students
      .find(student => student._id === studentId);
    student.academicPerformance
      .forEach(studentInfo => {
        if (studentInfo.subjectId === subjectId
          && studentInfo.teacherId === teacherId) {
          studentInfo.marks.forEach(mark => {
            if (mark.date === date) {
              markValue = mark.value;
            }
          });
        }
      });

    return !isNaN(markValue) ? markValue : "";
  }
}

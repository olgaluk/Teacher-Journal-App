import { Injectable } from '@angular/core';

import { AcademicPerformance } from '../../entities/academicPerformance';

@Injectable()
export class SubjectInfoService {
  getMark(
    date: string,
    academicPerformance: AcademicPerformance[],
    teacherId: string,
    subjectId: string
  ): number | null {
    let markValue;
    const studentInfo = academicPerformance
      .find((studentInfo) => {
        if (studentInfo.subjectId === subjectId
          && studentInfo.teacherId === teacherId) {
          return true;
        }
        return false;
      });
    if (!studentInfo) return null;
    studentInfo
      .marks
      .find((mark) => {
        if (mark.date === date) {
          markValue = mark.value;
        }
      })
    return (markValue || markValue === 0) ? markValue : null;
  }
}

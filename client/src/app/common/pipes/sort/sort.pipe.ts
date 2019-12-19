import { Pipe, PipeTransform } from '@angular/core';

import { Student } from '../../entities/student';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {

  transform(value: Student[]): Student[] {
    if (value.length) {
      const studentsSorting = JSON.parse(JSON.stringify(value))
        .sort((studentFirst, studentSecond) => {
          const studentFirstMarks = this.getStudentMarks(studentFirst);
          const studentSecondMarks = this.getStudentMarks(studentSecond);
          const studentFirstAverageMark = studentFirstMarks
            .reduce((acc, currentMark) => acc + currentMark) / studentFirstMarks.length;
          const studentSecondAverageMark = studentSecondMarks
            .reduce((acc, currentMark) => acc + currentMark) / studentSecondMarks.length;
          return studentSecondAverageMark - studentFirstAverageMark;
        });
      return studentsSorting;
    } else {
      return [];
    }
  }

  getStudentMarks(student: Student): number[] {
    if (!student.academicPerformance) return [-1];
    const marks = [];
    for (let key in student.academicPerformance) {
      marks.push(Object.values(student.academicPerformance[key]['marks']));
    }
    return marks.reduce((acc, currentValue) => acc.concat(currentValue)).filter(mark => mark !== null);
  }
}

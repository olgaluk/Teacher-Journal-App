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
            .reduce((acc, currentMark) => acc + currentMark, 0) / studentFirstMarks.length;
          const studentSecondAverageMark = studentSecondMarks
            .reduce((acc, currentMark) => acc + currentMark, 0) / studentSecondMarks.length;
          return studentSecondAverageMark - studentFirstAverageMark;
        });
      return studentsSorting;
    } else {
      return [];
    }

  }

  getStudentMarks(student: Student): number[] {
    if (!student.academicPerformance.length) return [-1];
    const studentMarks = student.academicPerformance
      .map(studentPerformance => studentPerformance.marks)
      .reduce((acc, marks) => acc.concat(marks), [])
      .map(mark => mark.value)
      .filter(mark => mark !== null);
    return studentMarks;
  }

}

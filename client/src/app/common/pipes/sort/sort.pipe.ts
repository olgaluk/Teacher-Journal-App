import { Pipe, PipeTransform } from '@angular/core';

import { Student } from '../../entities/student';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {

  transform(value: Student[]): Student[] {
    const studentsSorting = JSON.parse(JSON.stringify(value))
      .sort((studentFirst: Student, studentSecond: Student) => {
        const studentFirstAverageMark: number = this.getAverageMark(studentFirst);
        const studentSecondAverageMark: number = this.getAverageMark(studentSecond);
        return studentSecondAverageMark - studentFirstAverageMark;
      });
    return studentsSorting;
  }

  getAverageMark(student: Student): number {
    if (!student.academicPerformance) return -1;
    let marks = [];
    for (let key in student.academicPerformance) {
      marks.push(Object.values(student.academicPerformance[key]['marks']));
    }
    marks = marks
      .reduce((acc, currentValue) => acc.concat(currentValue))
      .filter((mark: number | null) => mark !== null);
    return (marks.reduce((acc, currentMark) => acc + currentMark) / marks.length);
  }
}

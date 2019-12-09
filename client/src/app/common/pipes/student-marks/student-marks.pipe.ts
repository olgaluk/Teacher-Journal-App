import { Pipe, PipeTransform } from '@angular/core';

import { AcademicPerformance } from '../../entities/academicPerformance';

@Pipe({
  name: 'studentMarks',
})
export class StudentMarksPipe implements PipeTransform {

  transform(academicPerformance: AcademicPerformance[]): number[] {
    if (!academicPerformance.length) { return [] };
    const marks = academicPerformance
      .map(studentPerformance => studentPerformance.marks)
      .reduce((acc, marks) => acc.concat(marks), [])
      .map(mark => mark.value)
      .filter(mark => mark !== null);
    return marks;
  }

}

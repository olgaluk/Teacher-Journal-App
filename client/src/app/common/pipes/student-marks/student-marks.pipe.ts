import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'studentMarks',
  pure: false
})
export class StudentMarksPipe implements PipeTransform {

  transform(academicPerformance: any, ...args: any[]): any {
    if (!academicPerformance.length) { return [] };
    const marks = academicPerformance
      .map(studentPerformance => studentPerformance.marks)
      .reduce((acc, marks) => acc.concat(marks), [])
      .map(mark => mark.value)
      .filter(mark => mark !== null);
    return marks;
  }

}

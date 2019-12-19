import { Pipe, PipeTransform } from '@angular/core';

import { Marks } from '../../entities/student';
import { AcademicPerformance } from '../../entities/student';

@Pipe({
  name: 'studentMarks',
})
export class StudentMarksPipe implements PipeTransform {

  transform(value: undefined | Marks | AcademicPerformance): number[] {
    if (!value) return [];
    if (Object.values(value)[0] instanceof Object) {
      let marks = [];
      for (let key in value) {
        marks.push(Object.values(value[key]['marks']));
      }
      return marks.reduce((acc, currentValue) => acc.concat(currentValue));
    }

    return Object.values(value);
  }
}

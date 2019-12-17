import { Pipe, PipeTransform } from '@angular/core';

import { Marks } from '../../entities/student';

@Pipe({
  name: 'studentMarks',
})
export class StudentMarksPipe implements PipeTransform {

  transform(marks: Marks): number[] {
    
    return Object.values(marks);    
  }

}

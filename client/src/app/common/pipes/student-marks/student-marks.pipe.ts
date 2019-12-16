import { Pipe, PipeTransform } from '@angular/core';

import { AcademicPerformance } from '../../entities/student';

@Pipe({
  name: 'studentMarks',
})
export class StudentMarksPipe implements PipeTransform {

  transform(academicPerformance: AcademicPerformance): number[] {

    
    return [];
  }

}

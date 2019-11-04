import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value.length) {
      const studentsSorting = value
        .sort((studentFirst, studentSecond) => {
          const studentFirstAverageMark = studentFirst.studentAllMarks
            .reduce((acc, currentMark) => acc + currentMark, 0) / studentFirst.studentAllMarks.length;
          const studentSecondAverageMark = studentSecond.studentAllMarks
            .reduce((acc, currentMark) => acc + currentMark, 0) / studentSecond.studentAllMarks.length;
          return studentSecondAverageMark - studentFirstAverageMark;
        });
      return studentsSorting;
    } else {
      return [];
    }
  }
}

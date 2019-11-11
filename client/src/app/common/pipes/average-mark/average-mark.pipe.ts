import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'averageMark'
})
export class AverageMarkPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const marks = value
      .filter(mark => !isNaN(mark));
    if (marks.length) {
      return (marks
        .reduce((acc, currentMark) => acc + currentMark, 0) / marks.length);
    } else {
      return "";
    }
  }
}

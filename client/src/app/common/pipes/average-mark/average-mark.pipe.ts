import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'averageMark'
})
export class AverageMarkPipe implements PipeTransform {

  transform(value: number[]): number | null {

    const marks = value
      .filter(mark => mark !== null);
    if (marks.length) {
      return (marks
        .reduce((acc, currentMark) => acc + currentMark, 0) / marks.length);
    } else {
      return null;
    }

  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'averageMark'
})
export class AverageMarkPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value.length) {
      return (value.reduce((acc, currentMark) => acc + currentMark, 0) / value.length);
    } else {
      return "";
    }
  }
}

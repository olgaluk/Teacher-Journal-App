import { Component } from '@angular/core';

interface selectOption {
  title: string;
  value: string;
  selected: boolean;
}

@Component({
  selector: 'export-app',
  template: `<h3>example</h3>
  <app-dropdown [formTitle]="subjectName" [options]="dates"></app-dropdown>`
})
export class ExportComponent {
  dates: selectOption[] = [
    { title: '15/04', value: 'date1', selected: false },
    { title: '15/05', value: 'date2', selected: false },
    { title: '16/05', value: 'date3', selected: false },
  ];
  subjectName: string = 'biology';
}
import { Component } from '@angular/core';

@Component({
  selector: 'export-app',
  template: `<h3>export</h3>
  <app-dropdown [options]="[{title: 'some', value: '1'}, {title: 'some2', value: '2'}]"></app-dropdown>`
})
export class ExportComponent { }
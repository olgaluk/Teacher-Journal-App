import { Component } from '@angular/core';

interface selectOption {
  title: string;
  value: string;
  selected: boolean;
}

@Component({
  selector: 'export-app',
  template: `<h3>example</h3>
  <app-dropdown-picker></app-dropdown-picker>`
})
export class ExportComponent {

}
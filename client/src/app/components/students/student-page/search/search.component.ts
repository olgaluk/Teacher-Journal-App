import { Component, Output, EventEmitter, ViewChild } from '@angular/core';

import { InputFormGroupComponent }
  from '../../../../shared/components/form/input-form-group/input-form-group.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchValue: string = '';
  @Output() searchStudents = new EventEmitter<any>();

  @ViewChild(InputFormGroupComponent, { static: false })
  private inputComponent: InputFormGroupComponent;

  getEnteredValue($event: string): void {
    this.searchValue = $event;
  }

  findStudent(): void {
    this.searchStudents.emit(this.searchValue);
  }

  reset(): void {
    this.searchValue = '';
    this.findStudent();
    this.inputComponent.reset();
  }
}

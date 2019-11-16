import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchValue: string = '';
  @Output() searchStudents = new EventEmitter<any>();

  checkEnteredValue($event: any): void {
    if (!((($event.keyCode >= 65) && ($event.keyCode <= 90)) || ($event.keyCode < 48))) {
      $event.returnValue = false;
    }
    if ($event.keyCode === 32) {
      $event.returnValue = $event.target.value.match(/\s{1,}/g) === null;
    }
  }

  findStudent(): void {
    this.searchStudents.emit(this.searchValue);
  }

  reset(): void {
    this.searchValue = '';
    this.findStudent();
  }
}

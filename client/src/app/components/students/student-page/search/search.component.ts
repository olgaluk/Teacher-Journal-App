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
    const correctValue = this.deleteCharacters($event.target.value);
    $event.target.value = correctValue;
    this.searchValue = correctValue;
  }

  deleteCharacters(string: string): string {
    let value: any = string;
    value = value
      .replace(/[0-9.*+-?^${}()|[\]\\]/g, '')
      .split(' ');
    if (!value.length) return '';
    if (value.length === 1) return value[0];
    if (value.length >= 2) {
      value[0] = value[0] + ' ';
      return value.join('');
    }
  }

  findStudent(): void {
    this.searchStudents.emit(this.searchValue);
  }
}

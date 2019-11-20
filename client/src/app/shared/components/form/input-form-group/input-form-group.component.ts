import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-input-form-group',
  templateUrl: './input-form-group.component.html',
  styleUrls: ['./input-form-group.component.scss']
})
export class InputFormGroupComponent implements OnInit {
  @Input() dataType: string;
  @Input() itemInfo: string;
  @Input() itemName: string;
  @Input() maxLength: string;
  @Input() itemValue: string;
  @Output() changeItemValue = new EventEmitter<any>();

  inputValue: string = '';

  ngOnInit(): void {
    if (this.itemValue) this.inputValue = this.itemValue;
  }

  reset(): void {
    this.inputValue = '';
  }

  onItemValueChange($event: any): void {
    this.itemInfo = '';
    if (this.dataType === 'only letters') {
      this.inputValue = $event.target.value = $event.target.value
        .replace(/[^A-Za-z]/g, '');
      if ($event.target.value.length === 1) {
        this.inputValue = $event.target.value = $event.target.value.toUpperCase();
      }
      if ($event.target.value.length > 1) {
        this.inputValue = $event.target.value = $event.target.value[0] +
          $event.target.value.slice(1).toLowerCase();
      }
    }
    if (this.dataType === 'only numbers') {
      this.inputValue = $event.target.value = $event.target.value
        .replace(/[^0-9]/g, '')
        .split(' ')
        .join('');
    }
    if (this.dataType === 'mark') {
      this.inputValue = $event.target.value = $event.target.value
        .replace(/[^0-9]/g, '')
        .split(' ')
        .join('');
      this.inputValue = $event.target.value =
        +$event.target.value > 10 ? '10' : $event.target.value;
    }
    if (this.dataType === 'only numbers, letters and spaces') {
      this.inputValue = $event.target.value = $event.target.value
        .replace(/[^A-Za-z0-9 .,]/g, '')
        .replace(/^ /g, '')
        .replace(/\s{2,}/g, ' ');
      if ($event.target.value.length === 1) {
        this.inputValue = $event.target.value = $event.target.value.toUpperCase();
      }
    }
    if (this.dataType === 'only letters and spaces') {
      this.inputValue = $event.target.value = $event.target.value
        .replace(/[^A-Za-z ]/g, '')
        .replace(/^ /g, '')
        .replace(/\s{2,}/g, ' ')
        .split(' ')
        .map(name => name !== '' ? name[0].toUpperCase() + name.slice(1).toLowerCase() : name)
        .filter((item, index) => index < 2)
        .join(' ');
    }

    if (this.maxLength && $event.target.value.length > this.maxLength) {
      this.inputValue = $event.target.value = $event.target.value.slice(0, this.maxLength);
    }

    this.changeItemValue.emit(this.inputValue);
  }
}

import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';

import {
  FormBuilder, FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-input-form-group',
  templateUrl: './input-form-group.component.html',
  styleUrls: ['./input-form-group.component.scss']
})
export class InputFormGroupComponent implements OnInit {
  @Input() dataType: string;
  @Input() itemInfo: string | null;
  @Input() itemName: string;
  @Input() maxLength: string;
  @Input() itemValue: string | null;
  @Output() changeItemValue = new EventEmitter<any>();

  inputForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      inputValue: [this.itemValue],
    });
  }

  reset(): void {
    this.inputForm.setValue({ inputValue: '' });
  }

  onItemValueChange($event: any): void {
    let value = $event.target.value;

    if (this.dataType === 'only letters') {
      value = value
        .replace(/[^A-Za-z]/g, '');
      if (value.length === 1) {
        value = value.toUpperCase();
      }
      if (value.length > 1) {
        value = value[0] +
          value.slice(1).toLowerCase();
      }
    }

    if (this.dataType === 'only numbers') {
      value = value
        .replace(/[^0-9]/g, '')
        .split(' ')
        .join('');
    }

    if (this.dataType === 'mark') {
      value = value
        .replace(/[^0-9]/g, '')
        .split(' ')
        .join('');
      value = +value > 10 ? '10' : value;
    }

    if (this.dataType === 'only numbers, letters and spaces') {
      value = value
        .replace(/[^A-Za-z0-9 .,]/g, '')
        .replace(/^ /g, '')
        .replace(/\s{2,}/g, ' ');
      if (value.length === 1) {
        value = value.toUpperCase();
      }
    }

    if (this.dataType === 'only letters and spaces') {
      value = value
        .replace(/[^A-Za-z ]/g, '')
        .replace(/^ /g, '')
        .replace(/\s{2,}/g, ' ')
        .split(' ')
        .map(name => name !== '' ? name[0].toUpperCase() + name.slice(1).toLowerCase() : name)
        .filter((item, index) => index < 2)
        .join(' ');
    }

    if (this.maxLength && value.length && value.length > this.maxLength) {
      value = value.slice(0, this.maxLength);
    }

    this.inputForm.setValue({ inputValue: value });
  }

  onChange(): void {
    this.changeItemValue.emit(this.inputForm.get(['inputValue']).value);
  }
}

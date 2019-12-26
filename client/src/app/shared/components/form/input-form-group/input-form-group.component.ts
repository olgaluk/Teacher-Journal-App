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

import { errorMessages } from '../../../../common/constants/errorMessages';

@Component({
  selector: 'app-input-form-group',
  templateUrl: './input-form-group.component.html',
  styleUrls: ['./input-form-group.component.scss']
})
export class InputFormGroupComponent implements OnInit {
  @Input()
    public inputForm: FormGroup;
  @Input() public dataType: string;  
  @Input() public itemName: string;
  @Input() public messageType: string;
  @Input() public maxLength: string;

  @Input() public itemValue: string | null;
  @Output() changeItemValue = new EventEmitter<any>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if(!this.inputForm) {
      this.inputForm = this.fb.group({
      inputValue: [this.itemValue],
    });
    }
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

  getMessage(error: { [key: string]: any }): string {
    const errorType = Object.keys(error);
    return errorMessages[this.messageType][errorType[0]];
  }

  onChange(): void {
    this.changeItemValue.emit(this.inputForm.get(['inputValue']).value);
  }
}

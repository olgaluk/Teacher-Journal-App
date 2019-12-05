import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface selectOption {
  title: string;
  value: string
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() options: selectOption[] = [];

  selectedOption: selectOption;
  open: boolean = false;

  getPlaceholder(): string {
    return this.selectedOption && this.selectedOption.hasOwnProperty('title') ? this.selectedOption.title : 'Select';
  }  

  optionSelect(option: selectOption) {
    this.writeValue(option.value);
    this.onTouched();
    this.open = false;
  }

  toggleOpen() {    
    this.open = !this.open;
  }

  isOpen(): boolean {
    return this.open;
  }

  writeValue(value) {
    if (!value || typeof value !== 'string') {
      return
    }
    const selectedEl = this.options.find(el => el.value === value);
    if (selectedEl) {
      this.selectedOption = selectedEl;
      this.onChange(this.selectedOption.value);
    }
  }

  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}

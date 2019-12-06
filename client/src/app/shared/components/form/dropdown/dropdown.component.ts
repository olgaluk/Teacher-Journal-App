import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

interface selectOption {
  title: string;
  value: string;
  selected: boolean;
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
export class DropdownComponent implements ControlValueAccessor, OnInit {
  @Input() options: selectOption[] = [];
  @Input() formTitle: string;
  @Input() isChecked: boolean;

  selectForm: FormGroup;
  open: boolean = false;
  newOptions: selectOption[] = [];
  outputItems: string = '';

  ngOnInit(): void {
    this.selectForm = new FormGroup({
      "formTitle": new FormControl(this.isChecked || false),
      "checkboxes": this.createCheckboxes()
    });
    this.newOptions = JSON.parse(JSON.stringify(this.options));
  }

  createCheckboxes() {
    const controls = this.options.map(option => {
      return new FormControl(option.selected);
    });
    return new FormArray(controls);
  }

  optionSelect(checked: boolean, option: selectOption) {
    const newOption = JSON.parse(JSON.stringify(option));
    newOption.selected = checked;
    this.writeValue(newOption);
    this.onTouched();
  }

  toggleOpen() {
    this.open = !this.open;
  }

  isOpen(): boolean {
    return this.open;
  }

  writeValue(newOption: selectOption) {
    const selectedItemIndex = this.options.findIndex(el => el.title === newOption.title);
    this.newOptions = this.newOptions.map((option, index) => (index === selectedItemIndex ? newOption : option));
    this.onChange(this.newOptions);
  }

  onChange: any = () => {
    this.outputItems = this.newOptions
      .filter(option => option.selected)
      .map(option => option.title)
      .join(',');
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

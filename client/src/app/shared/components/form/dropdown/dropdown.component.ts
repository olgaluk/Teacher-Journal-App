import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormGroup } from '@angular/forms';

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
export class DropdownComponent implements ControlValueAccessor {
  @Input()
  public selectForm: FormGroup;
  @Input() options: string[] = [];
  @Input() title: string;

  open: boolean = false;
  newOptions: string[] = [];

  toggleOpen(): void {
    this.open = !this.open;
  }

  isOpen(): boolean {
    return this.open;
  }

  writeValue() {
    this.onChange();
  }

  onChange(): void { };

  onTouched: any = () => { };

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}

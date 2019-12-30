import { Component, forwardRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

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
export class DropdownComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input()
  public selectForm: FormGroup;  
  @Input() title: string;

  dates: string[];
  open: boolean = false;
  private isCheckedSubscription: Subscription;

  ngOnInit() : void {
    this.subscribeToIsChecked();
    this.dates = Object.keys(this.selectForm.get('dates').value);
  }

  toggleOpen(): void {
    this.open = !this.open;
  }

  isOpen(): boolean {
    return this.open;
  }

  writeValue() {
    
    this.onChange();
  }

  onChange(): void { 
  };

  onTouched: any = () => { };

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  private subscribeToIsChecked(): void {
    this.isCheckedSubscription = this.selectForm.get('isChecked')
     .valueChanges
     .subscribe(value => {
       this.dates.forEach((date: string) => this.selectForm.controls['dates'].get(date).setValue(value));
      });
   }

   ngOnDestroy(): void {
    this.isCheckedSubscription.unsubscribe();
   }
}

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, OnDestroy {
  @Input()
  public selectForm: FormGroup;
  @Input() title: string;

  dates: string[] = [];
  open: boolean = false;
  private datesSubscription: Subscription;

  ngOnInit(): void {    
    this.dates = Object.keys(this.selectForm.get('dates').value);
    this.subscribeToDates();
  }

  toggleOpen(): void {
    this.open = !this.open;
  }

  isOpen(): boolean {
    return this.open;
  }

  private subscribeToDates(): void {
    this.datesSubscription = this.selectForm.get('dates')
      .valueChanges
      .subscribe((dates) => {
        const valuesDates = Object.values(dates);
        if (valuesDates.includes(true) && valuesDates.includes(false)) {
          this.selectForm.controls['isChecked'].setValue('partly');
        }
        if (!valuesDates.includes(false)) {
          this.selectForm.controls['isChecked'].setValue(true);
        }
        if (!valuesDates.includes(true)) {
          this.selectForm.controls['isChecked'].setValue(false);
        }
      });
  }

  public subscribeToIsChecked(): void {
    const valueIsChecked = this.selectForm.controls['isChecked'].value;
    this.dates.forEach(
      (date: string) => this.selectForm.controls['dates'].get(date).setValue(!valueIsChecked)
    );
  }

  ngOnDestroy(): void {
    this.datesSubscription.unsubscribe();
  }
}

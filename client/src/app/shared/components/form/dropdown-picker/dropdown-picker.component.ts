import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';

import { DropdownService } from '../../../../common/services/dropdown/dropdown.service';

@Component({
  selector: 'app-dropdown-picker',
  templateUrl: './dropdown-picker.component.html',
  styleUrls: ['./dropdown-picker.component.scss'],
  providers: [DropdownService],
})
export class DropdownPickerComponent implements OnInit, OnDestroy {
  dropdownPickerForm: FormGroup;
  subjects: string[] = ['subject1', 'subject2', 'subject3'];
  dates: string[] = ['15/04', '17/04', '11/05'];

  open: boolean = false;
  outputValue: string[] = [];

  subjectObs: Observable<{}> = this.dropdownService.getSubjectList();

  private datesSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private dropdownService: DropdownService
  ) { }

  ngOnInit() {
    this.initForm();
    this.subscribeToDates();
  }

  initForm(): void {
    this.dropdownPickerForm = this.formBuilder.group({});
    this.getControls();
  }

  getControls(): void {
    this.subjects.forEach((subject: string) => {
      this.dropdownPickerForm.setControl(subject, this.formBuilder.group({
        isChecked: this.formBuilder.control(false),
        dates: this.createCheckboxes()
      }))
    })

  }

  createCheckboxes(): FormGroup {
    const datesGroup = this.formBuilder.group({});
    this.dates.forEach(date => {
      datesGroup.setControl(date, this.formBuilder.control(false));
    });
    return datesGroup;
  }

  toggleOpen(): void {
    this.open = !this.open;
  }

  isOpen(): boolean {
    return this.open;
  }

  private subscribeToDates(): void {
    this.datesSubscription = this.dropdownPickerForm
      .valueChanges
      .subscribe((formData) => {
        this.outputValue = formData.getControls().value
          .map((subject) => formData[subject].dates)
          .map((dates) => {
            const checkedDates: string[] = [];
            for (let date in dates) {
              if (dates[date] === true) checkedDates.push(date);
            }
            return checkedDates;
          })
          .reduce((acc, currentDate) => acc.concat(currentDate));
      });
  }

  ngOnDestroy(): void {
    this.datesSubscription.unsubscribe();
  }
}

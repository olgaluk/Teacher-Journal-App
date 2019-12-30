import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';

import { DropdownService } from '../../../../common/services/dropdown/dropdown.service';

@Component({
  selector: 'app-dropdown-picker',
  templateUrl: './dropdown-picker.component.html',
  styleUrls: ['./dropdown-picker.component.scss'],
  providers: [DropdownService],
})
export class DropdownPickerComponent implements OnInit {
  dropdownPickerForm: FormGroup;
  subjects: string[] = ['subject1', 'subject2', 'subject3'];
  dates: string[] = ['15/04', '17/04', '11/05'];

  open: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
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
}

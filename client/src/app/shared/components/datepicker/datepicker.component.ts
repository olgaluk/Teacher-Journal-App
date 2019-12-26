import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class AppDatepickerComponent implements OnInit {
  @Input() valueDate: string;
  @Input() dates: string[];
  @Output() onChangedDate = new EventEmitter<string>();

  bsConfig: Partial<BsDatepickerConfig>;
  date: Date | string;
  datesFormatDate: Date[] = [];
  disabledDates: Date[];

  constructor() {
    this.bsConfig = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', containerClass: 'theme-blue' });
  }

  ngOnInit() {
    if (this.valueDate) {
      this.date = new Date(this.valueDate);
    } else {
      this.date = '';
    }

    if (this.dates.length) {
      this.dates.forEach(date => {
        if (date) {
          this.datesFormatDate.push(new Date(date));
        }
      })
    }

    this.disabledDates = this.datesFormatDate;
  }

  onValueChange(value: any): void {
    let newDate = '';
    if (value && this.valueDate !== value.toDateString()) {
      newDate = value.toDateString();
    }
    this.onChangedDate.emit(newDate);
  }
}

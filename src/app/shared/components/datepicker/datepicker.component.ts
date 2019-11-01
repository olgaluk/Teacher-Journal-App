import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  @Input() valueDate: string;
  @Input() dates: string[];

  bsConfig: Partial<BsDatepickerConfig>;
  date: Date | string;
  datesFormatDate: Date[] = [];
  disabledDates: Date[];

  constructor() {
    this.bsConfig = Object.assign({}, { dateInputFormat: 'DD/MM/YYYY', containerClass: 'theme-blue' });
  }

  ngOnInit() {
    if (this.valueDate) {
      this.date = this.convert(this.valueDate);
    } else {
      this.date = '';
    }

    if (this.dates.length) {
      this.dates.forEach(dateInfo => {
        if (dateInfo) {
          this.datesFormatDate.push(this.convert(dateInfo));
        }
      })
    }

    this.disabledDates = this.datesFormatDate;
  }

  convert(valueDate: string): Date {
    const dateParts = valueDate.split('/');
    const newConvertDate = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    return newConvertDate;
  }

  @Output() onChangedDate = new EventEmitter<string>();
  onValueChange(value: any): void {
    let newDate = '';
    if (value) {
      const year = value.getFullYear();
      let month = value.getMonth() + 1;
      let dt = value.getDate();
      if (dt < 10) {
        dt = '0' + dt;
      }
      if (month < 10) {
        month = '0' + month;
      }
      newDate = dt + '/' + month + '/' + year;
    }
    this.onChangedDate.emit(newDate);
  }
}

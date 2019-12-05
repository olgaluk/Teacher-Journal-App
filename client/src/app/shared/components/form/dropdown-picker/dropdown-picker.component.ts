import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DropdownService } from '../../../../common/services/dropdown/dropdown.service';

@Component({
  selector: 'app-dropdown-picker',
  templateUrl: './dropdown-picker.component.html',
  styleUrls: ['./dropdown-picker.component.scss'],
  providers: [ 
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownPickerComponent),
      multi: true,
    },
    DropdownService 
  ],
})
export class DropdownPickerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-form-group',
  templateUrl: './input-form-group.component.html',
  styleUrls: ['./input-form-group.component.scss']
})
export class InputFormGroupComponent {
  @Input() itemValue: string | number;
  @Input() itemInfo: string;
  @Input() itemName: string;
  @Output() changeItemValue = new EventEmitter<any>();

  onItemValueChange(valueItem: any) {
    this.changeItemValue.emit(valueItem);
  }
}

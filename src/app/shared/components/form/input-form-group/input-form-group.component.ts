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
  @Output() itemValueChange = new EventEmitter<string | number>();

  onItemValueChange(model: string | number) {
    this.itemValue = model;
    this.itemValueChange.emit(model);
  }
}

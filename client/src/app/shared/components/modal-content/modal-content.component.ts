import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent {
  title: string;
  closeBtnName: string;
  list: string[] = [];
  itemSelected: string;

  constructor(public bsModalRef: BsModalRef) { }

  close() {
    this.bsModalRef.hide();
  }
}

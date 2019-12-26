import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Teacher } from '../../../common/entities/teacher';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent {
  title: string;
  closeBtnName: string;
  list: Teacher[] = [];
  itemSelected: string;

  constructor(public bsModalRef: BsModalRef) { }

  close() {
    this.bsModalRef.hide();
  }
}

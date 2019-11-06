import { Component, ViewChild, ElementRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @ViewChild("template", { static: false })
  templateModal: ElementRef;

  modalRef: BsModalRef;
  config = {
    animated: true
  };
  constructor(private modalService: BsModalService) { }

  openModal() {
    this.modalRef = this.modalService.show(this.templateModal, this.config);
  }
}
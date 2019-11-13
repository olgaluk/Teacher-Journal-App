import { Component, OnInit, ViewChild } from '@angular/core';
import { SubjectsTableService } from '../../../../common/services/subjects/subjects-table.service';

import { Router } from '@angular/router';

import { ModalComponent } from '../../../../shared/components/modal/modal.component';

import { Teacher } from '../../../../common/entities/teacher';

import { INFO_MESSAGE_FOR_SUBJECT } from '../../../../common/constants/info-message-for-subject';
import { INFO_MESSAGE_FOR_CABINET } from '../../../../common/constants/info-message-for-cabinet';

@Component({
  selector: 'app-adding-subject',
  templateUrl: './adding-subject.component.html',
  providers: [SubjectsTableService],
  styleUrls: ['./adding-subject.component.scss']
})
export class AddingSubjectComponent implements OnInit {

  @ViewChild(ModalComponent, { static: false })
  private templateModalComponent: ModalComponent;

  subject: string;
  cabinet: number;
  description: string;

  subjectCorrectness: boolean = false;
  cabinetCorrectness: boolean = false;

  subjectInfo: string = "";
  cabinetInfo: string = "";

  subjectRegExp: any = /^[a-zA-Z/\s]+$/;
  cabinetRegExp: any = /^[0-9]+$/;
  firstLetterUppercaseRegExp: any = /^[A-Z]/;

  teachersAll: Teacher[] = [];
  buttonInfo: string = "Back to subject list";

  messageForSubject: string[] = INFO_MESSAGE_FOR_SUBJECT;
  messageForCabinet: string[] = INFO_MESSAGE_FOR_CABINET;

  constructor(
    private router: Router,
    private subjectsTableService: SubjectsTableService
  ) { }

  ngOnInit(): void {
    this.getTeachers();
  }

  getTeachers(): void {
    this.subjectsTableService.getTeachers()
      .subscribe((teachers: Teacher[]) => {
        this.teachersAll = teachers;
      });
  }

  changeItemValue(valueItem: any, itemName: string) {
    if (itemName === "subject") {
      this.subject = valueItem;
      this.checkSubjectCorrectness(valueItem);
    }
    if (itemName === "cabinet") {
      this.cabinet = valueItem;
      this.checkCabinetCorrectness(valueItem);
    }
    if (itemName === "description") {
      this.description = valueItem;
    }
  }

  checkSubjectCorrectness(valueItem: any): void {
    if (!this.subjectRegExp.test(valueItem) && valueItem) {
      this.subjectInfo = this.messageForSubject[0];
      this.subjectCorrectness = false;
    } else if (this.subjectRegExp.test(valueItem)) {
      this.subjectInfo = "";
      this.subjectCorrectness = true;
    }
  }

  checkCabinetCorrectness(valueItem: any): void {
    if (!this.cabinetRegExp.test(valueItem) && valueItem) {
      this.cabinetInfo = this.messageForCabinet[0];
      this.cabinetCorrectness = false;
    } else if (this.cabinetRegExp.test(valueItem)) {
      this.cabinetInfo = "";
      this.cabinetCorrectness = true;
    }
  }

  checkSubjectLengthCondition(subject: string): boolean {
    if (!subject) {
      this.subjectInfo = this.messageForSubject[4];
      return false;
    } else if (subject.length < 4) {
      this.subjectInfo = this.messageForSubject[2];
      return false;
    } else if (subject.length > 15) {
      this.subjectInfo = this.messageForSubject[3];
      return false;
    } else {
      return true;
    }
  }

  checkCabinetLengthCondition(cabinet: number): boolean {
    if (!cabinet) {
      this.cabinetInfo = this.messageForCabinet[3];
      return false;
    } else if (cabinet < 1) {
      this.cabinetInfo = this.messageForCabinet[1];
      return false;
    } else if (cabinet > 20) {
      this.cabinetInfo = this.messageForCabinet[2];
      return false;
    } else {
      return true;
    }
  }

  addNewSubject(
    subject: string,
    cabinet: number,
    teachersID: string[],
    description: string
  ): void {
    let newDescription: string;
    description ? newDescription = description : newDescription = "";
    let newTeachersID: string[];
    teachersID ? newTeachersID = teachersID : newTeachersID = [];

    const subjectLengthCondition: boolean = this.checkSubjectLengthCondition(subject);
    const cabinetLengthCondition: boolean = this.checkCabinetLengthCondition(cabinet);

    const conditionForAdding: boolean = (this.subjectCorrectness && subjectLengthCondition &&
      this.cabinetCorrectness && cabinetLengthCondition);
    if (conditionForAdding) {
      this.subjectsTableService.addNewSubject(subject, cabinet, newTeachersID, newDescription)
        .subscribe(() => this.router.navigate(['/subjects']));
    } else {
      this.templateModalComponent.openModal();
    }
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AddNewSubject } from '../../../../redux/store/actions/subject.actions';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../redux/store/app.state';
import { selectTeacherList } from '../../../../redux/store/selectors/teacher.selectors';

import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { NotificationSelfClosingComponent }
  from '../../../../shared/notifications/notification-self-closing/notification-self-closing.component';

import { Teacher } from '../../../../common/entities/teacher';
import { Subject } from '../../../../common/entities/subject';

import { INFO_MESSAGE_FOR_SUBJECT } from '../../../../common/constants/info-message-for-subject';
import { INFO_MESSAGE_FOR_CABINET } from '../../../../common/constants/info-message-for-cabinet';

@Component({
  selector: 'app-adding-subject',
  templateUrl: './adding-subject.component.html',
  styleUrls: ['./adding-subject.component.scss']
})
export class AddingSubjectComponent implements OnInit {

  @ViewChild(ModalComponent, { static: false })
  private templateModalComponent: ModalComponent;

  @ViewChild(NotificationSelfClosingComponent, { static: false })
  private notification: NotificationSelfClosingComponent;

  subject: string = '';
  cabinet: number;
  description: string = '';

  subjectInfo: string = '';
  cabinetInfo: string = '';

  teachersAll: Teacher[] = [];

  messageForSubject: any = INFO_MESSAGE_FOR_SUBJECT;
  messageForCabinet: any = INFO_MESSAGE_FOR_CABINET;

  constructor(
    private _router: Router,
    private _store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.getTeachers();
  }

  getTeachers(): void {
    this._store
      .pipe(select(selectTeacherList))
      .subscribe((teachers) => this.teachersAll = teachers);
  }

  changeItemValue(valueItem: any, itemName: string) {
    if (itemName === "subject") {
      if (valueItem) valueItem.toLowerCase();
      this.subject = valueItem;
    }
    if (itemName === "cabinet") {
      this.cabinet = +valueItem;
    }
    if (itemName === "description") {
      this.description = valueItem;
    }
  }

  checkSubjectLengthCondition(subject: string): boolean {
    if (!subject) {
      this.subjectInfo = this.messageForSubject.emptyField;
      return false;
    }
    if (subject.length < 4) {
      this.subjectInfo = this.messageForSubject.lengthBottomLine;
      return false;
    }
    return true;
  }

  checkCabinetLengthCondition(cabinet: number): boolean {
    if (!cabinet && cabinet !== 0) {
      this.cabinetInfo = this.messageForCabinet.emptyField;
      return false;
    }
    if (cabinet < 1) {
      this.cabinetInfo = this.messageForCabinet.valueBottomLine;
      return false;
    }
    if (cabinet > 30) {
      this.cabinetInfo = this.messageForCabinet.valueTopLine;
      return false;
    }
    return true;
  }

  checkNewSubjectParameters(): boolean {
    const subjectLengthCondition: boolean = this.checkSubjectLengthCondition(this.subject);
    const cabinetLengthCondition: boolean = this.checkCabinetLengthCondition(this.cabinet);
    return (subjectLengthCondition && cabinetLengthCondition);
  }

  addNewSubject(
    teachersID: string[]
  ): void {
    let newTeachersID: string[];
    teachersID ? newTeachersID = teachersID : newTeachersID = [];
    const conditionForAdding: boolean = this.checkNewSubjectParameters();
    if (conditionForAdding) {
      const newSubject = new Subject(this.subject, newTeachersID, this.cabinet, this.description);
      this._store.dispatch(new AddNewSubject(newSubject));
      this.notification.openNotification();
      setTimeout(() => this._router.navigate(['/subjects']), 4000);
    } else {
      this.templateModalComponent.openModal();
    }
  }
}

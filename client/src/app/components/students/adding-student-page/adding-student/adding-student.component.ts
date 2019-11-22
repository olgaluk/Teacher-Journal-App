import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AddNewStudent } from '../../../../redux/store/actions/student.actions';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../redux/store/state/app.state';

import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { NotificationSelfClosingComponent }
  from '../../../../shared/notifications/notification-self-closing/notification-self-closing.component';

import { Student } from 'src/app/common/entities/student';

import { INFO_MESSAGE_FOR_NAME } from '../../../../common/constants/info-message-for-name';
import { INFO_MESSAGE_FOR_LAST_NAME } from '../../../../common/constants/info-message-for-last-name';
import { INFO_MESSAGE_FOR_AGE } from '../../../../common/constants/info-message-for-age';
import { INFO_MESSAGE_FOR_ADDRESS } from '../../../../common/constants/info-message-for-address';

@Component({
  selector: 'app-adding-student',
  templateUrl: './adding-student.component.html',
  styleUrls: ['./adding-student.component.scss']
})
export class AddingStudentComponent {

  @ViewChild(ModalComponent, { static: false })
  private templateModalComponent: ModalComponent;

  @ViewChild(NotificationSelfClosingComponent, { static: false })
  private notification: NotificationSelfClosingComponent;

  name: string = "";
  lastName: string = "";
  age: number;
  address: string = "";

  nameInfo: string = "";
  lastNameInfo: string = "";
  ageInfo: string = "";
  addressInfo: string = "";

  messageForName: any = INFO_MESSAGE_FOR_NAME;
  messageForLastName: any = INFO_MESSAGE_FOR_LAST_NAME;
  messageForAge: any = INFO_MESSAGE_FOR_AGE;
  messageForAddress: any = INFO_MESSAGE_FOR_ADDRESS;

  constructor(
    private _router: Router,
    private _store: Store<IAppState>
  ) { }

  changeItemValue(valueItem: any, itemName: string) {
    if (itemName === "name") {
      this.name = valueItem;
    }
    if (itemName === "lastName") {
      this.lastName = valueItem;
    }
    if (itemName === "age") {
      this.age = +valueItem;
    }
    if (itemName === "address") {
      this.address = valueItem.trim();
    }
  }

  checkNameLengthCondition(name: string): boolean {
    if (!name) {
      this.nameInfo = this.messageForName.emptyField;
      return false;
    }
    if (name.length < 2) {
      this.nameInfo = this.messageForName.lengthBottomLine;
      return false;
    }
    return true;
  }

  checkLastNameLengthCondition(lastName: string): boolean {
    if (!lastName) {
      this.lastNameInfo = this.messageForLastName.emptyField;
      return false;
    }
    if (lastName.length < 2) {
      this.lastNameInfo = this.messageForLastName.lengthBottomLine;
      return false;
    }
    return true;
  }

  checkAgeRestrictionsCondition(age: number | null): boolean {
    if (!age && age !== 0) {
      this.ageInfo = this.messageForAge.emptyField;
      return false;
    }
    if (age < 17) {
      this.ageInfo = this.messageForAge.valueBottomLine;
      return false;
    }
    if (age > 24) {
      this.ageInfo = this.messageForAge.valueTopLine;
      return false;
    }
    return true;
  }

  checkAddressLengthCondition(address: string): boolean {
    if (!address) {
      this.addressInfo = this.messageForAddress.emptyField;
      return false;
    }
    if (address.length < 6) {
      this.addressInfo = this.messageForAddress.valueBottomLine;
      return false;
    }
    return true;
  }

  checkNewStudentParameters(): boolean {
    const nameLengthCondition: boolean = this.checkNameLengthCondition(this.name);
    const lastNameLengthCondition: boolean = this.checkLastNameLengthCondition(this.lastName);
    const ageRestrictionsCondition: boolean = this.checkAgeRestrictionsCondition(this.age);
    const addressLengthCondition: boolean = this.checkAddressLengthCondition(this.address);
    return (nameLengthCondition && lastNameLengthCondition &&
      ageRestrictionsCondition && addressLengthCondition);
  }

  addNewStudent(): void {
    const conditionForAdding: boolean = this.checkNewStudentParameters();
    if (conditionForAdding) {
      const newStudent: Student = new Student(this.name, this.lastName, this.age, this.address);
      this._store.dispatch(new AddNewStudent(newStudent));
      this.notification.openNotification();
      setTimeout(() => this._router.navigate(['/students']), 4000);
    } else {
      this.templateModalComponent.openModal();
    }
  }
}

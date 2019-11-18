import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { StudentsTableService } from '../../../../common/services/students/students-table.service';

import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { NotificationSelfClosingComponent }
  from '../../../../shared/notifications/notification-self-closing/notification-self-closing.component';

import { INFO_MESSAGE_FOR_NAME } from '../../../../common/constants/info-message-for-name';
import { INFO_MESSAGE_FOR_LAST_NAME } from '../../../../common/constants/info-message-for-last-name';
import { INFO_MESSAGE_FOR_AGE } from '../../../../common/constants/info-message-for-age';
import { INFO_MESSAGE_FOR_ADDRESS } from '../../../../common/constants/info-message-for-address';

@Component({
  selector: 'app-adding-student',
  templateUrl: './adding-student.component.html',
  providers: [StudentsTableService],
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

  messageForName: string[] = INFO_MESSAGE_FOR_NAME;
  messageForLastName: string[] = INFO_MESSAGE_FOR_LAST_NAME;
  messageForAge: string[] = INFO_MESSAGE_FOR_AGE;
  messageForAddress: string[] = INFO_MESSAGE_FOR_ADDRESS;

  buttonInfo: string = "Back to student list";

  constructor(
    private router: Router,
    private studentsTableService: StudentsTableService
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
      this.nameInfo = this.messageForName[5];
      return false;
    } else if (name.length < 2) {
      this.nameInfo = this.messageForName[3];
      return false;
    } else {
      return true;
    }
  }

  checkLastNameLengthCondition(lastName: string): boolean {
    if (!lastName) {
      this.lastNameInfo = this.messageForLastName[5];
      return false;
    } else if (lastName.length < 2) {
      this.lastNameInfo = this.messageForLastName[3];
      return false;
    } else {
      return true;
    }
  }

  checkAgeRestrictionsCondition(age: number | null): boolean {
    if (!age) {
      this.ageInfo = this.messageForAge[4];
      return false;
    } else if (age < 17) {
      this.ageInfo = this.messageForAge[2];
      return false;
    } else if (age > 24) {
      this.ageInfo = this.messageForAge[3];
      return false;
    } else {
      return true;
    }
  }

  checkAddressLengthCondition(address: string): boolean {
    if (!address) {
      this.addressInfo = this.messageForAddress[4];
      return false;
    } else if (address.length < 6) {
      this.addressInfo = this.messageForAddress[2];
      return false;
    } else {
      return true;
    }
  }

  addNewStudent(): void {
    const nameLengthCondition: boolean = this.checkNameLengthCondition(this.name);
    const lastNameLengthCondition: boolean = this.checkLastNameLengthCondition(this.lastName);
    const ageRestrictionsCondition: boolean = this.checkAgeRestrictionsCondition(this.age);
    const addressLengthCondition: boolean = this.checkAddressLengthCondition(this.address);

    const conditionForAdding: boolean = (nameLengthCondition && lastNameLengthCondition &&
      ageRestrictionsCondition && addressLengthCondition);
    if (conditionForAdding) {
      this.studentsTableService.addNewStudent(this.name, this.lastName, this.age, this.address)
        .subscribe(() => {
          this.notification.openNotification();
          setTimeout(() => this.router.navigate(['/students']), 4000);
        });
    } else {
      this.templateModalComponent.openModal();
    }
  }
}

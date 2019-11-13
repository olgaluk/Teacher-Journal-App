import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { StudentsTableService } from '../../../../common/services/students/students-table.service';

import { ModalComponent } from '../../../../shared/components/modal/modal.component';

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

  name: string = "";
  lastName: string = "";
  age: number;
  address: string = "";

  nameCorrectness: boolean = false;
  lastNameCorrectness: boolean = false;
  ageCorrectness: boolean = false;
  addressCorrectness: boolean = false;

  nameInfo: string = "";
  lastNameInfo: string = "";
  ageInfo: string = "";
  addressInfo: string = "";

  nameRegExp: any = /^[a-zA-Z/\s]+$/;
  spaceRegExp: any = /\s/;
  firstLetterUppercaseRegExp: any = /^[A-Z]/;
  lastNameRegExp: any = /^[a-zA-Z-/\s]+$/;
  ageRegExp: any = /^[0-9/\s]+$/;
  addressRegExp: any = /^[a-zA-Z0-9,/\s]+$/;

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
      this.checkNameCorrectness(valueItem);
    }
    if (itemName === "lastName") {
      this.lastName = valueItem;
      this.checkLastNameCorrectness(valueItem);
    }
    if (itemName === "age") {
      this.age = valueItem;
      this.checkAgeCorrectness(valueItem);
    }
    if (itemName === "address") {
      this.address = valueItem;
      this.checkAddressCorrectness(valueItem);
    }
  }

  checkNameCorrectness(valueItem: any): void {
    if (!this.nameRegExp.test(valueItem) && valueItem) {
      this.nameInfo = this.messageForName[0];
      this.nameCorrectness = false;
    } else if (this.spaceRegExp.test(valueItem) && valueItem) {
      this.nameInfo = this.messageForName[1];
      this.nameCorrectness = false;
    } else if (!this.firstLetterUppercaseRegExp.test(valueItem) && valueItem) {
      this.nameInfo = this.messageForName[2];
      this.nameCorrectness = false;
    } else if (!this.spaceRegExp.test(valueItem) &&
      ((this.nameRegExp.test(valueItem)
        && this.firstLetterUppercaseRegExp.test(valueItem)) || !valueItem)) {
      this.nameInfo = "";
      this.nameCorrectness = true;
    }
  }

  checkLastNameCorrectness(valueItem: any): void {
    if (!this.lastNameRegExp.test(valueItem) && valueItem) {
      this.lastNameInfo = this.messageForLastName[0];
      this.lastNameCorrectness = false;
    } else if (this.spaceRegExp.test(valueItem) && valueItem) {
      this.lastNameInfo = this.messageForLastName[1];
      this.lastNameCorrectness = false;
    } else if (!this.firstLetterUppercaseRegExp.test(valueItem) && valueItem) {
      this.lastNameInfo = this.messageForLastName[2];
      this.lastNameCorrectness = false;
    } else if (!this.spaceRegExp.test(valueItem) &&
      ((this.lastNameRegExp.test(valueItem)
        && this.firstLetterUppercaseRegExp.test(valueItem)) || !valueItem)) {
      this.lastNameInfo = "";
      this.lastNameCorrectness = true;
    }
  }

  checkAgeCorrectness(valueItem: any): void {
    if (!this.ageRegExp.test(valueItem) && valueItem) {
      this.ageInfo = this.messageForAge[0];
      this.ageCorrectness = false;
    } else if (this.spaceRegExp.test(valueItem) && valueItem) {
      this.ageInfo = this.messageForAge[1];
      this.ageCorrectness = false;
    } else if (!this.spaceRegExp.test(valueItem) &&
      (this.ageRegExp.test(valueItem) || !valueItem)) {
      this.ageInfo = "";
      this.ageCorrectness = true;
    }
  }

  checkAddressCorrectness(valueItem: any): void {
    if (!this.addressRegExp.test(valueItem) && valueItem) {
      this.addressInfo = this.messageForAddress[0];
      this.addressCorrectness = false;
    } else if (!this.firstLetterUppercaseRegExp.test(valueItem) && valueItem) {
      this.addressInfo = this.messageForAddress[1];
      this.addressCorrectness = false;
    } else if (this.addressRegExp.test(valueItem)
      && this.firstLetterUppercaseRegExp.test(valueItem)) {
      this.addressInfo = "";
      this.addressCorrectness = true;
    }
  }

  checkNameLengthCondition(name: string): boolean {
    if (!name) {
      this.nameInfo = this.messageForName[5];
      return false;
    } else if (name.length < 2) {
      this.nameInfo = this.messageForName[3];
      return false;
    } else if (name.length > 15) {
      this.nameInfo = this.messageForName[4];
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
    } else if (lastName.length > 20) {
      this.lastNameInfo = this.messageForLastName[4];
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
    } else if (address.length > 30) {
      this.addressInfo = this.messageForAddress[3];
      return false;
    } else {
      return true;
    }
  }

  addNewStudent(
    name: string,
    lastName: string,
    age: number | null,
    address: string
  ): void {
    const nameLengthCondition: boolean = this.checkNameLengthCondition(name);
    const lastNameLengthCondition: boolean = this.checkLastNameLengthCondition(lastName);
    const ageRestrictionsCondition: boolean = this.checkAgeRestrictionsCondition(age);
    const addressLengthCondition: boolean = this.checkAddressLengthCondition(address);

    const conditionForAdding: boolean = (this.nameCorrectness && nameLengthCondition &&
      this.lastNameCorrectness && lastNameLengthCondition &&
      this.ageCorrectness && ageRestrictionsCondition &&
      this.addressCorrectness && addressLengthCondition);
    if (conditionForAdding) {
      this.studentsTableService.addNewStudent(name, lastName, age, address)
        .subscribe(() => {
          alert('Student created');
          this.router.navigate(['/students']);
        });
    } else {
      this.templateModalComponent.openModal();
    }
  }
}

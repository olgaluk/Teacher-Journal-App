import { Component } from '@angular/core';
import { DataService } from '../../../../common/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adding-student',
  templateUrl: './adding-student.component.html',
  styleUrls: ['./adding-student.component.scss']
})
export class AddingStudentComponent {

  nameInfo: string = "";
  lastNameInfo: string = "";
  ageInfo: string = "";
  addressInfo: string = "";

  buttonInfo: string = "Back to student list";

  constructor(private dataService: DataService, private router: Router) { }

  addNewStudent(
    name: string,
    lastName: string,
    age: number | null,
    address: string
  ): void {
    const nameRegExp = /[a-zA-Z]{2,15}/;
    const ageRegExp = /[0-9]{2,2}/;
    const addressRegExp = /^[a-zA-Z0-9,]+$/;
    const messageAboutFilling = "Please fill in this field!";
    const messageIncorrectly = "Incorrectly entered value!";
    const messageForAge = "Please check the entered value!";
    if (!name || !lastName || !age || !address) {
      !name ? this.nameInfo = messageAboutFilling : this.nameInfo = "";
      !lastName ? this.lastNameInfo = messageAboutFilling : this.lastNameInfo = "";
      !age ? this.ageInfo = messageForAge : this.ageInfo = "";
      !address ? this.addressInfo = messageAboutFilling : this.addressInfo = "";
    } else if (!nameRegExp.test(name)) {
      this.nameInfo = messageIncorrectly;
    } else if (!nameRegExp.test(lastName)) {
      this.lastNameInfo = messageIncorrectly;
    } else if (!ageRegExp.test(age.toString())) {
      this.ageInfo = messageIncorrectly;
    } else if (!addressRegExp.test(address)) {
      this.addressInfo = messageIncorrectly;
    } else {
      this.dataService.addDataNewStudent(name, lastName, age, address);
      this.router.navigate(['/students']);
    }
  }

  clearMessages(fieldName: string) {
    this[fieldName] = "";
  }
}

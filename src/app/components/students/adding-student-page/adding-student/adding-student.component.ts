import { Component } from '@angular/core';
import { DataService } from '../../../../common/services/data.service';

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

  constructor(private dataService: DataService) { }

  addNewStudent(
    name: string,
    lastName: string,
    age: number,
    address: string
  ): void {
    console.log(name, lastName, age, address);
    const nameRegExp = /^[a-zA-Z]+$/;
    const ageRegExp = /^[0-9]+$/;
    const addressRegExp = /^[a-zA-Z0-9,]+$/;
    const messageAboutFilling = "Please fill in this field!";
    const messageIncorrectly = "Incorrectly entered value!";
    if(!name || !lastName || !age || !address) {
      !name ? this.nameInfo = messageAboutFilling : this.nameInfo = "";
      !lastName ? this.lastNameInfo = messageAboutFilling : this.lastNameInfo = "";
      !age ? this.ageInfo = messageAboutFilling : this.ageInfo = "";
      !address ? this.addressInfo = messageAboutFilling : this.addressInfo = "";
    } else if(!nameRegExp.test(name)) {
      this.nameInfo = messageIncorrectly;
    } else if(!nameRegExp.test(lastName)) {
      this.lastNameInfo = messageIncorrectly;
    } else {
      this.dataService.addDataNewStudent(name, lastName, age, address);
    }    
  }

  clearMessages(fieldName: string) {
    this[fieldName] = "";
  }
}

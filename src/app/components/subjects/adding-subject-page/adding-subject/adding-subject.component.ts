import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../common/services/data.service';
import { Router } from '@angular/router';

import { Teacher } from '../../../../common/entities/teacher';

@Component({
  selector: 'app-adding-subject',
  templateUrl: './adding-subject.component.html',
  styleUrls: ['./adding-subject.component.scss']
})
export class AddingSubjectComponent implements OnInit {

  subjectInfo: string = "";
  cabinetInfo: string = "";

  teachersAll: Teacher[] = [];
  buttonInfo: string = "Back to subject list";

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getTeachers();
  }

  getTeachers(): void {
    this.teachersAll = this.dataService.getDataTeachers();
  }

  addNewSubject(
    subject: string,
    cabinet: number,
    teachersID: string[],
    description: string
  ): void {
    const subjectNameRegExp = /[a-zA-Z]{4,15}/;
    const cabinetRegExp = /[0-9]{1,2}/;
    const messageAboutFilling = "Please fill in this field!";
    const messageIncorrectly = "Incorrectly entered value!";
    const messageForCabinet = "Please check the entered value!";
    if (!subject || !cabinet) {
      !subject ? this.subjectInfo = messageAboutFilling : this.subjectInfo = "";
      !cabinet ? this.cabinetInfo = messageForCabinet : this.cabinetInfo = "";
    } else if (!subjectNameRegExp.test(subject)) {
      this.subjectInfo = messageIncorrectly;
    } else if (!cabinetRegExp.test(cabinet.toString())) {
      this.cabinetInfo = messageIncorrectly;
    } else {
      let descriptionNew: string;
      description ? descriptionNew = description : descriptionNew = "";
      let teachersIDNew: string[];
      teachersID ? teachersIDNew = teachersID : teachersIDNew = [];
      this.dataService.addDataNewSubject(subject, cabinet, teachersIDNew, descriptionNew);
      this.router.navigate(['/subjects']);
    }
  }

  clearMessages(fieldName: string) {
    this[fieldName] = "";
  }
}

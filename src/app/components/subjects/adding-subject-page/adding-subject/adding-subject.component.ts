import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../common/services/data.service';

import { Subject } from '../../../../common/entities/subject';
import { Teacher } from '../../../../common/entities/teacher';

@Component({
  selector: 'app-adding-subject',
  templateUrl: './adding-subject.component.html',
  styleUrls: ['./adding-subject.component.scss']
})
export class AddingSubjectComponent implements OnInit {

  items: Subject[] = [];
  teachersAll: Teacher[] = [];
   buttonInfo: string = "Back to subject list";

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getSubjects();
    this.getTeachers();
  }

  getTeachers(): void {
    this.teachersAll = this.dataService.getDataTeachers();
  }

  getSubjects(): void {
    this.items = this.dataService.getDataSubjects();
  }

  addItem(
    subject: string,
    cabinet: number,
    teachersID: string[],
    description: string
  ): void {
    console.log(subject, cabinet, teachersID, description);
    this.dataService.addDataSubject(subject, cabinet, teachersID, description);
  }

}

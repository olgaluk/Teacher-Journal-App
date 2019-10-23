import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../common/services/data.service';

import { Subject } from '../../../../common/entities/subject';

@Component({
  selector: 'app-subjects-table',
  templateUrl: './subjects-table.component.html',
  styleUrls: ['./subjects-table.component.scss']
})
export class SubjectsTableComponent implements OnInit {

  items: Subject[] = [];
  condition: boolean = true;
  buttonInfo: string = "Add new subject";

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects(): void {
    this.items = this.dataService.getDataSubjects();
  }

  toggle(): void {
    this.condition = !this.condition;
    this.buttonInfo === "Add new subject" ? this.buttonInfo = "Back" : this.buttonInfo = "Add new subject";
  }

  addItem(
    subject: string,
    cabinet: number,
    description: string
  ): void {
    this.dataService.addDataSubject(subject, cabinet, description);
  }
}

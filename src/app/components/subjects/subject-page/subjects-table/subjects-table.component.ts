import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../common/services/data.service';

import { Subject } from '../../../../common/entities/subject';

@Component({
  selector: 'app-subjects-table',
  templateUrl: './subjects-table.component.html',
  styleUrls: ['./subjects-table.component.scss']
})
export class SubjectsTableComponent implements OnInit {

  subjects: Subject[] = [];
  buttonInfo: string = "Add new subject";

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects(): void {
    this.subjects = this.dataService.getDataSubjects();
  }
}

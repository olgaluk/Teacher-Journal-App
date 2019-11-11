import { Component, OnInit } from '@angular/core';
import { SubjectsTableService } from '../../../../common/services/subjects/subjects-table.service';

import { Subject } from '../../../../common/entities/subject';

@Component({
  selector: 'app-subjects-table',
  templateUrl: './subjects-table.component.html',
  providers: [SubjectsTableService],
  styleUrls: ['./subjects-table.component.scss']
})
export class SubjectsTableComponent implements OnInit {

  subjects: Subject[] = [];
  buttonInfo: string = "Add new subject";

  constructor(private subjectsTableService: SubjectsTableService) { }

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects(): void {
    this.subjectsTableService.getSubjects()
      .subscribe((subjects: Subject[]) => this.subjects = subjects);
  }
}

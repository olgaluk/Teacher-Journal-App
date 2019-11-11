import { Component, OnInit } from '@angular/core';
import { SubjectsTableService } from '../../../../common/services/subjects/subjects-table.service';
import { ActivatedRoute } from '@angular/router';

import { flatMap } from 'rxjs/operators';

import { Teacher } from '../../../../common/entities/teacher';

@Component({
  selector: 'app-subject-teachers',
  templateUrl: './subject-teachers.component.html',
  providers: [SubjectsTableService],
  styleUrls: ['./subject-teachers.component.scss']
})
export class SubjectTeachersComponent implements OnInit {

  subjectName: string;
  teachers: Teacher[] = [];
  buttonInfo: string = "Back to subject list";

  constructor(private subjectsTableService: SubjectsTableService, private activateRoute: ActivatedRoute) {
    this.subjectName = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getTeachersListBySubject(this.subjectName);
  }

  getTeachersListBySubject(subjectName: string): void {
    this.subjectsTableService.getSubjectByName(subjectName)
      .pipe(flatMap(subject =>
        this.subjectsTableService.getTeachersListById(subject.teachersID)
      ))
      .subscribe((teachers: Teacher[]) => this.teachers = teachers);
  }
}

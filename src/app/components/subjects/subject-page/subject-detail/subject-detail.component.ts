import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from '../../../../common/entities/subject';
import subjectsInfo from '../../../../../../data/subjects.json';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss']
})
export class SubjectDetailComponent implements OnInit {
  id: string;
  subjects: Subject[] = subjectsInfo;
  subject: object = {};
  constructor(private activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.subject = this.subjects.filter(subject => subject.subject === this.id)[0];
  }
}

import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../common/services/data.service';
import { ActivatedRoute } from '@angular/router';

import { Teacher } from '../../../../common/entities/teacher';

@Component({
  selector: 'app-subject-teachers',
  templateUrl: './subject-teachers.component.html',
  styleUrls: ['./subject-teachers.component.scss']
})
export class SubjectTeachersComponent implements OnInit {

  id: string;
  teachers: Teacher[] = [];

  constructor(private dataService: DataService, private activateRoute: ActivatedRoute) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getTeachersFromSubject(this.id);
  }

  getTeachersFromSubject(id: string): void {
    this.teachers = this.dataService.getDataTeachersFromSubject(id);
  }
}

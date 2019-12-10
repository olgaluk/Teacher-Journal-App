import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../redux/store/app.state';
import { selectTeacherListBySubject } from '../../../../redux/store/subjects/subject-teachers/subject-teachers.selectors';
import {
  getTeacherListbySubject,
  reset,
} from '../../../../redux/store/subjects/subject-teachers/subject-teachers.actions';

import { Teacher } from '../../../../common/entities/teacher';

@Component({
  selector: 'app-subject-teachers',
  templateUrl: './subject-teachers.component.html',
  styleUrls: ['./subject-teachers.component.scss']
})
export class SubjectTeachersComponent implements OnInit, OnDestroy {
  subjectName: string;
  teacherListBySubject$: Observable<Teacher[]> = this.store
    .pipe(select(selectTeacherListBySubject));

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.subjectName = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getTeachers();
  }

  getTeachers(): void {
    this.store.dispatch(getTeacherListbySubject({ subjectName: this.subjectName }));
  }

  deleteTeachers(): void {
    this.store.dispatch(reset());
  }

  navigateToSubjectDetail(selectedTeacherId: string) {
    this.router.navigate(['subjects', `${this.subjectName}`, selectedTeacherId]);
  }

  ngOnDestroy(): void {
    this.deleteTeachers();
  }
}

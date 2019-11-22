import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../redux/store/state/app.state';
import { selectTeacherListBySubject } from '../../../../redux/store/selectors/teacher.selectors';
import {
  GetTeachersBySubject,
  DeleteTeachersBySubject
} from '../../../../redux/store/actions/teacher.actions';

import { Teacher } from '../../../../common/entities/teacher';

@Component({
  selector: 'app-subject-teachers',
  templateUrl: './subject-teachers.component.html',
  styleUrls: ['./subject-teachers.component.scss']
})
export class SubjectTeachersComponent implements OnInit, OnDestroy {
  subjectName: string;
  teacherListBySubject$: Observable<Teacher[]>;

  constructor(
    private _store: Store<IAppState>,
    private _router: Router,
    private _activateRoute: ActivatedRoute
  ) {
    this.subjectName = _activateRoute.snapshot.params['id'];
    this.teacherListBySubject$ = this._store
      .pipe(select(selectTeacherListBySubject));
  }

  ngOnInit(): void {
    this.getTeachers();
  }

  ngOnDestroy(): void {
    this.deleteTeachers();
  }

  getTeachers(): void {
    this._store.dispatch(new GetTeachersBySubject(this.subjectName));
  }

  deleteTeachers(): void {
    this._store.dispatch(new DeleteTeachersBySubject());
  }

  navigateToSubjectDetail(selectedTeacher: Teacher) {
    this._router.navigate(['subjects', `${this.subjectName}`, selectedTeacher.id]);
  }
}

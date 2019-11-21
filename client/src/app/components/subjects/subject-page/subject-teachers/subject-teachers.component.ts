import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../redux/store/state/app.state';
import { selectTeacherListBySubject } from '../../../../redux/store/selectors/teacher.selectors';
import { SaveSelectedTeacher } from '../../../../redux/store/actions/teacher.actions';
import {
  GetStudentsBySelectedSubject,
  ISubjectAndTeacherId
} from '../../../../redux/store/actions/student.actions';

import { Teacher } from '../../../../common/entities/teacher';

@Component({
  selector: 'app-subject-teachers',
  templateUrl: './subject-teachers.component.html',
  styleUrls: ['./subject-teachers.component.scss']
})
export class SubjectTeachersComponent {
  subjectName: string;
  teacherListBySubject$: Observable<Teacher[]>;

  constructor(
    private _store: Store<IAppState>,
    private _router: Router,
    private _activateRoute: ActivatedRoute
  ) {
    this.subjectName = _activateRoute.snapshot.params['id'];
    this.teacherListBySubject$ = _store
      .pipe(select(selectTeacherListBySubject));
  }

  navigateToSubjectDetail(selectedTeacher: Teacher) {
    this._store.dispatch(new SaveSelectedTeacher(selectedTeacher));
    const subjectAndTeacherId: ISubjectAndTeacherId = {
      teacherId: selectedTeacher.id,
      subjectId: this.subjectName
    };
    this._store.dispatch(new GetStudentsBySelectedSubject(subjectAndTeacherId));
    this._router.navigate(['subjects', `${this.subjectName}`, selectedTeacher.id]);
  }
}

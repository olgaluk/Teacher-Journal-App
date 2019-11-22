import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import {
  ETeacherActions,
  GetTeachers,
  GetTeachersSuccess,
  GetTeachersBySubject,
  GetTeachersBySubjectSuccess,
  GetTeachersFromOtherSubject,
  GetTeachersFromOtherSubjectSuccess
} from '../actions/teacher.actions';
import { HttpTeacherService } from '../../../common/services/teachers/http-teacher.service';
import { HttpSubjectService } from '../../../common/services/subjects/http-subject.service';
import { Teacher } from '../../../common/entities/teacher';
import { Subject } from '../../../common/entities/subject';

@Injectable()
export class TeacherEffects {
  @Effect()
  getTeachers$: Observable<Action> = this._actions$.pipe(
    ofType<GetTeachers>(ETeacherActions.GetTeachers),
    switchMap(() => this._httpTeacherService.getTeachers()),
    switchMap((teachers: Teacher[]) => of(new GetTeachersSuccess(teachers)))
  );

  @Effect()
  getTeachersBySubject$: Observable<Action> = this._actions$.pipe(
    ofType<GetTeachersBySubject>(ETeacherActions.GetTeachersBySubject),
    map(action => action.payload),
    switchMap((subjectName: string) => this._httpSubjectService.getSubjectByName(subjectName)),
    switchMap((subject: Subject) => this._httpTeacherService.getTeachersListById(subject.teachersID)),
    switchMap((teachers: Teacher[]) => of(new GetTeachersBySubjectSuccess(teachers)))
  );

  @Effect()
  getTeachersFromOtherSubject$: Observable<Action> = this._actions$.pipe(
    ofType<GetTeachersFromOtherSubject>(ETeacherActions.GetTeachersFromOtherSubject),
    map(action => action.payload),
    switchMap((idList: string[]) => this._httpTeacherService.getTeachersFromOtherSubject(idList)),
    switchMap((teachers: Teacher[]) => of(new GetTeachersFromOtherSubjectSuccess(teachers)))
  );

  constructor(
    private _httpTeacherService: HttpTeacherService,
    private _httpSubjectService: HttpSubjectService,
    private _actions$: Actions
  ) { }
}
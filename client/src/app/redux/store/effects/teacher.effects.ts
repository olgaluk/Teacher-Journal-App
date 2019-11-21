import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import {
  ETeacherActions,
  GetTeachersBySubject,
  GetTeachersBySubjectSuccess
} from '../actions/teacher.actions';
import { HttpTeacherService } from '../../../common/services/teachers/http-teacher.service';
import { Teacher } from '../../../common/entities/teacher';

@Injectable()
export class TeacherEffects {
  @Effect()
  getTeachersBySubject$: Observable<Action> = this._actions$.pipe(
    ofType<GetTeachersBySubject>(ETeacherActions.GetTeachersBySubject),
    map(action => action.payload),
    switchMap((idList) => this._httpTeacherService.getTeachersListById(idList)),
    switchMap((teachers: Teacher[]) => of(new GetTeachersBySubjectSuccess(teachers)))
  );

  constructor(
    private _httpTeacherService: HttpTeacherService,
    private _actions$: Actions
  ) { }
}
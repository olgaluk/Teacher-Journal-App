import { Injectable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';

import { IAppState } from '../../app.state';
import { HttpTeacherService } from '../../../../common/services/teachers/http-teacher.service';
import { HttpSubjectService } from '../../../../common/services/subjects/http-subject.service';
import { Subject } from '../../../../common/entities/subject';

import {
  getTeacherList,
  getTeacherListSuccess,
  addNewSubject,
  updateDataSaved,
} from './adding-subject.actions';

import {
  selectSubject
} from './adding-subject.selectors';

import { Teacher } from '../../../../common/entities/teacher';

@Injectable()
export class AddingSubjectEffects {
  getTeacherList$: Observable<Action> = createEffect(() =>
    this._actions$.pipe(
      ofType(getTeacherList.type),
      mergeMap(() => {
        return this._httpTeacherService.getTeachers()
          .pipe(
            map((teacherList: Teacher[]) => getTeacherListSuccess({ teacherList }))
          )
      })
    )
  );

  addNewSubject$: Observable<Action> = createEffect(() =>
    this._actions$.pipe(
      ofType(addNewSubject.type),
      withLatestFrom(this._store.pipe(select(selectSubject))),
      mergeMap(([props, { subjectName, cabinet, description, selectedTeachersId }]) => {
        const newSubject: Subject = new Subject(subjectName, selectedTeachersId, cabinet, description);
        return this._httpSubjectService.addNewSubject(newSubject)
          .pipe(
            map(() => updateDataSaved({ dataSaved: true })),
            catchError(() => of(updateDataSaved({ dataSaved: false })))
          )
      })
    )
  );

  constructor(
    private _httpTeacherService: HttpTeacherService,
    private _httpSubjectService: HttpSubjectService,
    private _actions$: Actions,
    private _store: Store<IAppState>,
  ) { }
}

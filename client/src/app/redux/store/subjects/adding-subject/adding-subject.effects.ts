import { Injectable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';

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
    this.actions$.pipe(
      ofType(getTeacherList),
      switchMap(() => this.httpTeacherService.getItems()),
      map((teacherList: Teacher[]) => getTeacherListSuccess({ teacherList }))
    )
  );

  addNewSubject$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewSubject),
      withLatestFrom(this.store.pipe(select(selectSubject))),
      mergeMap(([props, { subjectName, cabinet, description, selectedTeachersId }]) => {
        const newSubject: Subject = new Subject(subjectName, selectedTeachersId, cabinet, description);
        return this.httpSubjectService.addNewItem(newSubject)
          .pipe(
            map(() => updateDataSaved({ dataSaved: true })),
            catchError(() => of(updateDataSaved({ dataSaved: false })))
          )
      })
    )
  );

  constructor(
    private httpTeacherService: HttpTeacherService,
    private httpSubjectService: HttpSubjectService,
    private actions$: Actions,
    private store: Store<IAppState>,
  ) { }
}

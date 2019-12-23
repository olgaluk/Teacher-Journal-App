import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { HttpTeacherService } from '../../../../common/services/teachers/http-teacher.service';
import { HttpSubjectService } from '../../../../common/services/subjects/http-subject.service';
import { Subject } from '../../../../common/entities/subject';

import {
  getTeacherList,
  getTeacherListSuccess,
  addNewSubject,
  updateDataSaved,
} from './adding-subject.actions';

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
      switchMap(({ subjectName, cabinet, description, selectedTeachers }) => {
        const newSubject: Subject = new Subject(subjectName, selectedTeachers, cabinet, description);
        return this.httpSubjectService.addNewItem(newSubject)
      }),
      map(() => updateDataSaved({ dataSaved: true })),
      catchError(() => of(updateDataSaved({ dataSaved: false })))
    )
  );

  constructor(
    private httpTeacherService: HttpTeacherService,
    private httpSubjectService: HttpSubjectService,
    private actions$: Actions,
  ) { }
}

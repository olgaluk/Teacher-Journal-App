import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, concatMap, mergeMap } from 'rxjs/operators';

import { HttpStudentService } from '../../../../common/services/students/http-student.service';
import { Student } from '../../../../common/entities/student';

import {
  getStudentList,
  getStudentListSuccess,
  getStudentsByName,
  getStudentsByNameSuccess,
} from './students-table.actions';

@Injectable()
export class StudentsTableEffects {
  getStudentList$: Observable<Action> = createEffect(() =>
    this._actions$.pipe(
      ofType(getStudentList.type),
      mergeMap(() => this._httpStudentService.getStudents().pipe(
        map((studentList: Student[]) => getStudentListSuccess({
          studentList
        }))
      )),
    )
  );

  getStudentsByName$: Observable<Action> = createEffect(() =>
    this._actions$.pipe(
      ofType(getStudentsByName.type),
      mergeMap(({ inputName }) => this._httpStudentService.getStudentsByName(inputName).pipe(
        map((searchedStudents: Student[]) => getStudentsByNameSuccess({
          searchedStudents
        }))
      )),
    )
  );

  constructor(
    private _httpStudentService: HttpStudentService,
    private _actions$: Actions,
  ) { }
}

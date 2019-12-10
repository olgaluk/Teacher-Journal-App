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
    this.actions$.pipe(
      ofType(getStudentList.type),
      mergeMap(() => this.httpStudentService.getStudents().pipe(
        map((studentList: Student[]) => getStudentListSuccess({
          studentList
        }))
      )),
    )
  );

  getStudentsByName$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getStudentsByName.type),
      mergeMap(({ inputName }) => this.httpStudentService.getStudentsByName(inputName).pipe(
        map((searchedStudents: Student[]) => getStudentsByNameSuccess({
          searchedStudents
        }))
      )),
    )
  );

  constructor(
    private httpStudentService: HttpStudentService,
    private actions$: Actions,
  ) { }
}

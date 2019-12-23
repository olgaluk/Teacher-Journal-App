import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { IAppState } from '../../../../redux/store/app.state';

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
      ofType(getStudentList),
      switchMap(() => this.httpStudentService.getItems()),
      map((studentList: Student[]) => getStudentListSuccess({
        studentList
      }))
    )
  );

  getStudentsByName$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getStudentsByName),
      switchMap(({ searchValue }) => this.httpStudentService.getItemListByName(searchValue.trim())),
      map((searchedStudents: Student[]) => getStudentsByNameSuccess({
        searchedStudents
      }))
    )
  );

  constructor(
    private httpStudentService: HttpStudentService,
    private actions$: Actions,
    private store: Store<IAppState>,
  ) { }
}

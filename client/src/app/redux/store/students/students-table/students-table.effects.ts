import { Injectable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { IAppState } from '../../../../redux/store/app.state';

import { HttpStudentService } from '../../../../common/services/students/http-student.service';
import { Student } from '../../../../common/entities/student';

import {
  getStudentList,
  getStudentListSuccess,
  getStudentsByName,
  getStudentsByNameSuccess,
} from './students-table.actions';

import { selectSearchValue } from './students-table.selectors';

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
      withLatestFrom(this.store.pipe(select(selectSearchValue))),
      switchMap(([props, searchValue]) => this.httpStudentService.getItemListByName(searchValue.trim())),
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

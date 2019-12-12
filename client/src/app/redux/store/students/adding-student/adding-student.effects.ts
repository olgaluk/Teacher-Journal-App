import { Injectable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';

import { IAppState } from '../../app.state';
import { HttpStudentService } from '../../../../common/services/students/http-student.service';
import { Student } from '../../../../common/entities/student';

import {
  addNewStudent,
  updateDataSaved,
} from './adding-student.actions';

import {
  selectStudentInfo
} from './adding-student.selectors';

@Injectable()
export class AddingStudentEffects {
  addNewStudent$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewStudent.type),
      withLatestFrom(this.store.pipe(select(selectStudentInfo))),
      mergeMap(([props, { name, lastName, age, address }]) => {
        const newStudent: Student = new Student(name, lastName, age, address);
        return this.httpStudentService.addNewItem(newStudent)
          .pipe(
            map(() => updateDataSaved({ dataSaved: true })),
            catchError(() => of(updateDataSaved({ dataSaved: false })))
          )
      }
      )
    )
  );

  constructor(
    private httpStudentService: HttpStudentService,
    private actions$: Actions,
    private store: Store<IAppState>,
  ) { }
}

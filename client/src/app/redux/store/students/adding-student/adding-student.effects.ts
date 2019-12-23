import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { HttpStudentService } from '../../../../common/services/students/http-student.service';
import { Student } from '../../../../common/entities/student';

import {
  addNewStudent,
  updateDataSaved,
} from './adding-student.actions';

@Injectable()
export class AddingStudentEffects {
  addNewStudent$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewStudent),
      switchMap(({ name, lastName, age, address }) => {
        const newStudent: Student = new Student(name, lastName, age, address);
        return this.httpStudentService.addNewItem(newStudent);
      }),
      map(() => updateDataSaved({ dataSaved: true })),
      catchError(() => of(updateDataSaved({ dataSaved: false })))
    )
  );

  constructor(
    private httpStudentService: HttpStudentService,
    private actions$: Actions,
  ) { }
}

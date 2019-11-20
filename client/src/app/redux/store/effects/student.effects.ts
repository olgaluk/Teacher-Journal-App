import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  EStudentActions,
  GetStudents,
  GetStudentsSuccess
} from '../actions/student.actions';
import { StudentsTableService } from '../../../common/services/students/students-table.service';
import { Student } from '../../../common/entities/student';

@Injectable()
export class StudentEffects {
  @Effect()
  getStudents$: Observable<Action> = this._actions$.pipe(
    ofType<GetStudents>(EStudentActions.GetStudents),
    switchMap(() => this.studentsTableService.getStudents()),
    switchMap((students: Student[]) => of(new GetStudentsSuccess(students)))
  );

  constructor(
    private studentsTableService: StudentsTableService,
    private _actions$: Actions
  ) { }
}
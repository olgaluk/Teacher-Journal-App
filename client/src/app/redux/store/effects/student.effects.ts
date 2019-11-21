import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  EStudentActions,
  GetStudents,
  GetStudentsSuccess,
  GetStudentsByName,
  GetStudentsByNameSuccess,
  GetStudentsBySelectedSubject,
  GetStudentsBySelectedSubjectSuccess
} from '../actions/student.actions';
import { HttpStudentService } from '../../../common/services/students/http-student.service';
import { Student } from '../../../common/entities/student';

@Injectable()
export class StudentEffects {
  @Effect()
  getStudents$: Observable<Action> = this._actions$.pipe(
    ofType<GetStudents>(EStudentActions.GetStudents),
    switchMap(() => this._httpStudentService.getStudents()),
    switchMap((students: Student[]) => of(new GetStudentsSuccess(students)))
  );

  @Effect()
  getSearchedStudentsByName$ = this._actions$.pipe(
    ofType<GetStudentsByName>(EStudentActions.GetStudentsByName),
    map(action => action.payload),
    switchMap((name) => this._httpStudentService.getStudentsByName(name)),
    switchMap((students: Student[]) => of(new GetStudentsByNameSuccess(students)))
  );

  @Effect()
  getStudentsBySelectedSubject$ = this._actions$.pipe(
    ofType<GetStudentsBySelectedSubject>(EStudentActions.GetStudentsBySelectedSubject),
    map((action) => action.payload),
    switchMap((subjectIdAndTeacherId) => {
      const { teacherId, subjectId } = subjectIdAndTeacherId;
      return this._httpStudentService.getStudentsBySubjectAndTeacher(teacherId, subjectId);
    }),
    switchMap((students: Student[]) => of(new GetStudentsBySelectedSubjectSuccess(students)))
  );

  constructor(
    private _httpStudentService: HttpStudentService,
    private _actions$: Actions
  ) { }
}
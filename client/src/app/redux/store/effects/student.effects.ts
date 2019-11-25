import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  EStudentActions,
  GetStudents,
  GetStudentsSuccess,
  GetStudentsByName,
  GetStudentsByNameSuccess,
  GetStudentsBySelectedSubject,
  GetStudentsBySelectedSubjectSuccess,
  AddNewStudent,
  AddNewStudentSuccess,
  UpdateStudents,
  UpdateStudentsSuccess
} from '../actions/student.actions';
import { HttpStudentService } from '../../../common/services/students/http-student.service';
import { HttpSubjectService } from '../../../common/services/subjects/http-subject.service';
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
    switchMap((subjectNameAndTeacherId) => {
      const { teacherId, subjectName } = subjectNameAndTeacherId;
      return forkJoin(
        of(teacherId),
        this._httpSubjectService.getSubjectByName(subjectName)
      )
    }),
    switchMap((teacherIdAndSubject) => {
      const teacherId = teacherIdAndSubject[0];
      const subjectId = teacherIdAndSubject[1]._id;
      return this._httpStudentService.getStudentsBySubjectAndTeacher(teacherId, subjectId);
    }),
    switchMap((students: Student[]) => of(new GetStudentsBySelectedSubjectSuccess(students)))
  );

  @Effect()
  addNewStudent$ = this._actions$.pipe(
    ofType<AddNewStudent>(EStudentActions.AddNewStudent),
    map((action) => action.payload),
    switchMap((newStudent) => {
      return this._httpStudentService.addNewStudent(newStudent);
    }),
    switchMap((student: Student) => of(new AddNewStudentSuccess(student)))
  );

  @Effect()
  updateStudents$ = this._actions$.pipe(
    ofType<UpdateStudents>(EStudentActions.UpdateStudents),
    map(action => action.payload),
    switchMap((students: Student[]) => this._httpStudentService.updateStudents(students)),
    switchMap((students: Student[]) => of(new UpdateStudentsSuccess(students)))
  );

  constructor(
    private _httpStudentService: HttpStudentService,
    private _httpSubjectService: HttpSubjectService,
    private _actions$: Actions
  ) { }
}

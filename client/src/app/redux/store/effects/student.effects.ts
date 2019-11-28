import { Injectable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, forkJoin } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

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
  GetDates,
  GetDatesSuccess,
  ISubjectIdAndTeacherId,
  ISubjectNameAndTeacherId,
  INewDateInfo,
  AddEmptyDateSuccess,
  ChangeDate,
  ChangeDateSuccess
} from '../actions/student.actions';
import { HttpStudentService } from '../../../common/services/students/http-student.service';
import { HttpSubjectService } from '../../../common/services/subjects/http-subject.service';

import { IAppState } from '../app.state';
import { selectStudentListBySubject } from '../selectors/student.selectors';

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
      const teacherIdAndSubjectId = {
        teacherId,
        subjectId,
      }
      return forkJoin(
        of(teacherIdAndSubjectId),
        this._httpStudentService.getStudentsBySubjectAndTeacher(teacherId, subjectId)
      );
    }),
    switchMap((idAndStudents) => {
      return of(
        new GetStudentsBySelectedSubjectSuccess(idAndStudents[1]),
        new GetDatesSuccess(idAndStudents[0])
      );
    })
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

  @Effect({ dispatch: false })
  updateStudents$ = this._actions$.pipe(
    ofType<UpdateStudents>(EStudentActions.UpdateStudents),
    map(action => action),
    withLatestFrom(this._store.pipe(select(selectStudentListBySubject))),
    switchMap(([action, students]) => {
      return this._httpStudentService.updateStudents(students);
    })
  );

  @Effect()
  getDates$ = this._actions$.pipe(
    ofType<GetDates>(EStudentActions.GetDates),
    map((action) => action.payload),
    switchMap((subjectNameAndTeacherId: ISubjectNameAndTeacherId) => {
      const { teacherId, subjectName } = subjectNameAndTeacherId;
      return forkJoin(
        of(teacherId),
        this._httpSubjectService.getSubjectByName(subjectName)
      )
    }),
    map((teacherIdAndSubject) => {
      const idInfo: ISubjectIdAndTeacherId = {
        teacherId: teacherIdAndSubject[0],
        subjectId: teacherIdAndSubject[1]._id
      }
      return idInfo;
    }),
    switchMap((idInfo: ISubjectIdAndTeacherId) => of(new GetDatesSuccess(idInfo)))
  );

  @Effect()
  addEmptyDate$ = this._actions$.pipe(
    ofType<GetDates>(EStudentActions.AddEmptyDate),
    map((action) => action.payload),
    switchMap((subjectNameAndTeacherId: ISubjectNameAndTeacherId) => {
      const { teacherId, subjectName } = subjectNameAndTeacherId;
      return forkJoin(
        of(teacherId),
        this._httpSubjectService.getSubjectByName(subjectName)
      )
    }),
    map((teacherIdAndSubject) => {
      const idInfo: ISubjectIdAndTeacherId = {
        teacherId: teacherIdAndSubject[0],
        subjectId: teacherIdAndSubject[1]._id
      }
      return idInfo;
    }),
    switchMap((idInfo: ISubjectIdAndTeacherId) => of(
      new AddEmptyDateSuccess(idInfo),
      new GetDatesSuccess(idInfo),
    ))
  );

  @Effect()
  changeDate$ = this._actions$.pipe(
    ofType<ChangeDate>(EStudentActions.ChangeDate),
    map((action) => action.payload),
    switchMap((newDateInfo: INewDateInfo) => {
      const { subjectName } = newDateInfo;
      return forkJoin(
        of(newDateInfo),
        this._httpSubjectService.getSubjectByName(subjectName)
      )
    }),
    map((teacherIdAndSubject) => {
      const idInfo: INewDateInfo = {
        ...teacherIdAndSubject[0],
        subjectName: teacherIdAndSubject[1]._id
      }
      return idInfo;
    }),
    switchMap((idInfo: INewDateInfo) => {
      const { teacherId, subjectName } = idInfo;
      const subjectIdAndTeacherId: ISubjectIdAndTeacherId = {
        teacherId,
        subjectId: subjectName
      }
      return of(
        new ChangeDateSuccess(idInfo),
        new GetDatesSuccess(subjectIdAndTeacherId),
      );
    })
  );

  constructor(
    private _store: Store<IAppState>,
    private _httpStudentService: HttpStudentService,
    private _httpSubjectService: HttpSubjectService,
    private _actions$: Actions
  ) { }
}

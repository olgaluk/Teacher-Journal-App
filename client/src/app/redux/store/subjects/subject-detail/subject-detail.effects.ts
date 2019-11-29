import { Injectable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of, forkJoin } from 'rxjs';
import { map, catchError, mergeMap, concatMap, withLatestFrom } from 'rxjs/operators';

import { HttpSubjectService } from '../../../../common/services/subjects/http-subject.service';
import { HttpTeacherService } from '../../../../common/services/teachers/http-teacher.service';
import { HttpStudentService } from '../../../../common/services/students/http-student.service';

import { IAppState } from '../../app.state';
import { selectSelectedSubject, selectStudentListBySubject } from '../../subjects/subject-detail/subject-detail.selectors';

import { Subject } from '../../../../common/entities/subject';
import { Teacher } from '../../../../common/entities/teacher';

import {
  getInitialInfo,
  getSelectedSubject,
  getSelectedSubjectSuccess,
  getSelectedTeacher,
  getSelectedTeacherSuccess,
  getStudentsBySelectedSubject,
  getStudentsBySelectedSubjectSuccess,
  getDates,
  getTeachersFromOtherSubject,
  getTeachersFromOtherSubjectSuccess,
  saveChanges,
  deleteEmptyMarks,
  updateTeacherInStudents,
  updateInfoInDatabase,
  updateInfoInDatabaseSuccess,
  updateTeacherListInSubject,
} from './subject-detail.actions';

@Injectable()
export class SubjectDetailEffects {
  getInitialInfo$: Observable<Action> = createEffect(() =>
    this._actions$.pipe(
      ofType(getInitialInfo.type),
      mergeMap(({ subjectName, teacherId }) => {
        return forkJoin(
          this._httpSubjectService.getSubjectByName(subjectName),
          this._httpTeacherService.getTeacherById(teacherId)
        );
      }),
      mergeMap(([subject, teacher]) => {
        return [
          getSelectedSubjectSuccess({ subject }),
          getSelectedTeacherSuccess({ teacher }),
          getStudentsBySelectedSubject({ teacherId: teacher.id, subjectId: subject._id }),
          getTeachersFromOtherSubject({ teacherListForCurrentSubject: subject.teachersID }),
        ];
      })
    )
  );

  getSelectedSubject$: Observable<Action> = createEffect(() =>
    this._actions$.pipe(
      ofType(getSelectedSubject.type),
      mergeMap(({ subjectName }) => this._httpSubjectService.getSubjectByName(subjectName).pipe(
        map((subject: Subject) => getSelectedSubjectSuccess({ subject }))
      )),
    )
  );

  getSelectedTeacher$: Observable<Action> = createEffect(() =>
    this._actions$.pipe(
      ofType(getSelectedTeacher.type),
      mergeMap(({ teacherId }) => this._httpTeacherService.getTeacherById(teacherId).pipe(
        map((teacher: Teacher) => getSelectedTeacherSuccess({ teacher }))
      )),
    )
  );

  getStudentsBySelectedSubject$: Observable<Action> = createEffect(() =>
    this._actions$.pipe(
      ofType(getStudentsBySelectedSubject.type),
      mergeMap(({ teacherId, subjectId }) => {
        return forkJoin(
          of({ teacherId, subjectId }),
          this._httpStudentService.getStudentsBySubjectAndTeacher(teacherId, subjectId)
        );
      }),
      concatMap(([{ teacherId, subjectId }, students]) => {
        return [
          getStudentsBySelectedSubjectSuccess({ students }),
          getDates({ teacherId, subjectId })
        ];
      })
    )
  );

  getTeachersFromOtherSubject$: Observable<Action> = createEffect(() =>
    this._actions$.pipe(
      ofType(getTeachersFromOtherSubject.type),
      mergeMap(({ teacherListForCurrentSubject }) => this._httpTeacherService
        .getTeachersFromOtherSubject(teacherListForCurrentSubject)
        .pipe(
          map((teachersFromOtherSubjects: Teacher[]) => getTeachersFromOtherSubjectSuccess({
            teachersFromOtherSubjects
          }))
        )),
    )
  );

  saveChanges$: Observable<Action> = createEffect(() =>
    this._actions$.pipe(
      ofType(saveChanges.type),
      withLatestFrom(this._store.pipe(select(selectSelectedSubject))),
      concatMap(([{ teacherId, newTeacherId }, subject]) => {
        const subjectId = subject._id;
        return [
          deleteEmptyMarks(),
          getDates({ teacherId, subjectId }),
          updateTeacherInStudents({ newTeacherId }),
          updateTeacherListInSubject({ teacherId, newTeacherId }),
          updateInfoInDatabase({ subjectId, teacherId, newTeacherId }),
        ];
      })
    )
  );

  updateInfoInDatabase$: Observable<Action> = createEffect(
    () => this._actions$.pipe(
      ofType(updateInfoInDatabase.type),
      withLatestFrom(this._store.pipe(select(selectStudentListBySubject))),
      mergeMap(([{ subjectId, teacherId, newTeacherId }, students]) => {
        if (newTeacherId && teacherId !== newTeacherId) {
          return forkJoin(
            this._httpStudentService.updateStudents(students),
            this._httpSubjectService.updateSubjectTeachersId({
              _id: subjectId,
              teacherId,
              newTeacherId,
            }),
          ).pipe(
            map(() => updateInfoInDatabaseSuccess({ save: true })),
            catchError(() => of(updateInfoInDatabaseSuccess({ save: false })))
          );
        } else {
          return this._httpStudentService.updateStudents(students).pipe(
            map(() => updateInfoInDatabaseSuccess({ save: true })),
            catchError(() => of(updateInfoInDatabaseSuccess({ save: false })))
          );
        }
      })
    )
  );

  constructor(
    private _httpSubjectService: HttpSubjectService,
    private _httpTeacherService: HttpTeacherService,
    private _httpStudentService: HttpStudentService,
    private _actions$: Actions,
    private _store: Store<IAppState>,
  ) { }
}

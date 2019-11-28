import { Injectable } from '@angular/core';
import { Action, Store, select, props } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of, EMPTY, forkJoin } from 'rxjs';
import { switchMap, map, catchError, mergeMap, concatMap, withLatestFrom } from 'rxjs/operators';

import { HttpSubjectService } from '../../../../common/services/subjects/http-subject.service';
import { HttpTeacherService } from '../../../../common/services/teachers/http-teacher.service';
import { HttpStudentService } from '../../../../common/services/students/http-student.service';

import { IAppState } from '../../app.state';
import { selectSelectedSubject } from '../../subjects/subject-detail/subject-detail.selectors';

import { Subject } from '../../../../common/entities/subject';
import { Teacher } from '../../../../common/entities/teacher';
import { Student } from '../../../../common/entities/student';

import {
  ESubjectDetailActions,
  getSelectedSubject,
  getSelectedSubjectSuccess,
  getSelectedTeacher,
  getSelectedTeacherSuccess,
  getStudentsBySelectedSubject,
  getStudentsBySelectedSubjectSuccess,
  getDates,
} from './subject-detail.actions';

@Injectable()
export class SubjectDetailEffects {
  getInitialInfo$: Observable<Action> = createEffect(() =>
    this._actions$.pipe(
      ofType(ESubjectDetailActions.GetInitialInfo),
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
        ];
      })
    )
  );

  getSelectedSubject$: Observable<Action> = createEffect(() =>
    this._actions$.pipe(
      ofType(ESubjectDetailActions.GetSelectedSubject),
      mergeMap(({ subjectName }) => this._httpSubjectService.getSubjectByName(subjectName)),
      mergeMap((subject: Subject) => {
        return of(getSelectedSubjectSuccess({ subject }));
      })
    )
  );

  getSelectedTeacher$: Observable<Action> = createEffect(() =>
    this._actions$.pipe(
      ofType(ESubjectDetailActions.GetSelectedTeacher),
      mergeMap(({ teacherId }) => this._httpTeacherService.getTeacherById(teacherId)),
      mergeMap((teacher: Teacher) => {
        return of(getSelectedTeacherSuccess({ teacher }));
      })
    )
  );

  getStudentsBySelectedSubject$: Observable<Action> = createEffect(() =>
    this._actions$.pipe(
      ofType(ESubjectDetailActions.GetStudentsBySelectedSubject),
      mergeMap(({ teacherId, subjectId }) => {
        return this._httpStudentService.getStudentsBySubjectAndTeacher(teacherId, subjectId).pipe(map((students: Student[]) => {
          return getStudentsBySelectedSubjectSuccess({ students });
        }),
          map(() => {
            return getDates({ teacherId, subjectId });
          })
        )
      }),
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

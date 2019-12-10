import { Injectable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of, forkJoin } from 'rxjs';
import { map, catchError, mergeMap, concatMap, withLatestFrom } from 'rxjs/operators';

import { HttpSubjectService } from '../../../../common/services/subjects/http-subject.service';
import { HttpTeacherService } from '../../../../common/services/teachers/http-teacher.service';
import { HttpStudentService } from '../../../../common/services/students/http-student.service';

import { IAppState } from '../../app.state';
import {
  selectSelectedSubject,
  selectStudentListBySubject,
} from '../../subjects/subject-detail/subject-detail.selectors';

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
  updateDataSaved,
  updateTeacherListInSubject,
  updateTeachersFromOtherSubject,
} from './subject-detail.actions';

@Injectable()
export class SubjectDetailEffects {
  getInitialInfo$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getInitialInfo.type),
      mergeMap(({ subjectName, teacherId }) => {
        return forkJoin(
          this.httpSubjectService.getSubjectByName(subjectName),
          this.httpTeacherService.getTeacherById(teacherId)
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
    this.actions$.pipe(
      ofType(getSelectedSubject.type),
      mergeMap(({ subjectName }) => this.httpSubjectService.getSubjectByName(subjectName).pipe(
        map((subject: Subject) => getSelectedSubjectSuccess({ subject }))
      )),
    )
  );

  getSelectedTeacher$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getSelectedTeacher.type),
      mergeMap(({ teacherId }) => this.httpTeacherService.getTeacherById(teacherId).pipe(
        map((teacher: Teacher) => getSelectedTeacherSuccess({ teacher }))
      )),
    )
  );

  getStudentsBySelectedSubject$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getStudentsBySelectedSubject.type),
      mergeMap(({ teacherId, subjectId }) => {
        return forkJoin(
          of({ teacherId, subjectId }),
          this.httpStudentService.getStudentsBySubjectAndTeacher(teacherId, subjectId)
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
    this.actions$.pipe(
      ofType(getTeachersFromOtherSubject.type),
      mergeMap(({ teacherListForCurrentSubject }) => this.httpTeacherService
        .getTeachersFromOtherSubject(teacherListForCurrentSubject)
        .pipe(
          map((teachersFromOtherSubjects: Teacher[]) => getTeachersFromOtherSubjectSuccess({
            teachersFromOtherSubjects
          }))
        )),
    )
  );

  saveChanges$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(saveChanges.type),
      withLatestFrom(this.store.pipe(select(selectSelectedSubject))),
      concatMap(([{ teacherId, newTeacherId }, subject]) => {
        const subjectId = subject._id;
        if (newTeacherId && teacherId !== newTeacherId) {
          return [
            deleteEmptyMarks(),
            getDates({ teacherId, subjectId }),
            updateTeacherInStudents({ newTeacherId }),
            getSelectedTeacher({ teacherId: newTeacherId }),
            updateTeacherListInSubject({ teacherId, newTeacherId }),
            updateTeachersFromOtherSubject(),
            updateInfoInDatabase({ subjectId, teacherId, newTeacherId }),
          ];
        } else {
          return [
            deleteEmptyMarks(),
            getDates({ teacherId, subjectId }),
            updateInfoInDatabase({ subjectId, teacherId, newTeacherId }),
          ];
        }
      })
    )
  );

  updateInfoInDatabase$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(updateInfoInDatabase.type),
      withLatestFrom(this.store.pipe(select(selectStudentListBySubject))),
      mergeMap(([{ subjectId, teacherId, newTeacherId }, students]) => {
        if (newTeacherId && teacherId !== newTeacherId) {
          return forkJoin(
            this.httpStudentService.updateStudents(students),
            this.httpSubjectService.updateSubjectTeachersId({
              _id: subjectId,
              teacherId,
              newTeacherId,
            }),
          ).pipe(
            map(() => updateDataSaved({ save: true })),
            catchError(() => of(updateDataSaved({ save: false })))
          );
        } else {
          return this.httpStudentService.updateStudents(students).pipe(
            map(() => updateDataSaved({ save: true })),
            catchError(() => of(updateDataSaved({ save: false })))
          );
        }
      })
    )
  );

  updateTeachersFromOtherSubject$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTeachersFromOtherSubject.type),
      withLatestFrom(this.store.pipe(select(selectSelectedSubject))),
      mergeMap(([props, subject]) => this.httpTeacherService
        .getTeachersFromOtherSubject(subject.teachersID)
        .pipe(
          map((teachersFromOtherSubjects: Teacher[]) => getTeachersFromOtherSubjectSuccess({
            teachersFromOtherSubjects
          }))
        )
      ),
    )
  );

  constructor(
    private httpSubjectService: HttpSubjectService,
    private httpTeacherService: HttpTeacherService,
    private httpStudentService: HttpStudentService,
    private actions$: Actions,
    private store: Store<IAppState>,
  ) { }
}

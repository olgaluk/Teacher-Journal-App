import { Injectable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of, forkJoin, combineLatest } from 'rxjs';
import { map, catchError, mergeMap, concatMap, withLatestFrom, switchMap } from 'rxjs/operators';

import { HttpSubjectService } from '../../../../common/services/subjects/http-subject.service';
import { HttpTeacherService } from '../../../../common/services/teachers/http-teacher.service';
import { HttpStudentService } from '../../../../common/services/students/http-student.service';

import { IAppState } from '../../app.state';
import {
  selectSelectedSubject,
  selectSelectedTeacher,
  selectStudentListBySubject,
} from '../../subjects/subject-detail/subject-detail.selectors';

import { Subject } from '../../../../common/entities/subject';
import { Teacher } from '../../../../common/entities/teacher';

import {
  getInitialInfo,
  getSelectedSubject,
  getSelectedSubjectSuccess,
  updateSelectedTeacher,
  updateSelectedTeacherSuccess,
  getStudentsBySelectedSubject,
  getStudentsBySelectedSubjectSuccess,
  getDates,
  getTeachersFromOtherSubject,
  getTeachersFromOtherSubjectSuccess,
  saveChanges,
  deleteEmptyMarks,
  updateInfoInDatabase,
  updateDataSaved,
  updateTeachersFromOtherSubject,
  setSelectedTeacher,
} from './subject-detail.actions';

@Injectable()
export class SubjectDetailEffects {
  getInitialInfo$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getInitialInfo),
      mergeMap(({ subjectName, teacherId }) => {
        return forkJoin(
          this.httpSubjectService.getItemByName(subjectName),
          this.httpTeacherService.getItemById(teacherId)
        );
      }),
      mergeMap(([subject, teacher]) => {
        return [
          getSelectedSubjectSuccess({ subject }),
          setSelectedTeacher({ teacher }),
          getStudentsBySelectedSubject({ teacherId: teacher.id, subjectName: subject.name }),
          getTeachersFromOtherSubject({ teacherListForCurrentSubject: subject.teachersID }),
        ];
      })
    )
  );

  getSelectedSubject$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getSelectedSubject),
      switchMap(({ subjectName }) => this.httpSubjectService.getItemByName(subjectName)),
      map((subject: Subject) => getSelectedSubjectSuccess({ subject }))
    )
  );

  updateSelectedTeacher$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSelectedTeacher),
      switchMap(({ oldTeacherId, newTeacherId }) => forkJoin(of(oldTeacherId), this.httpTeacherService.getItemById(newTeacherId))),
      map(([oldTeacherId, teacher]) => updateSelectedTeacherSuccess({ teacherId: oldTeacherId, teacher }))
    )
  );

  getStudentsBySelectedSubject$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getStudentsBySelectedSubject),
      mergeMap(({ teacherId, subjectName }) => {
        return forkJoin(
          of({ teacherId, subjectName }),
          this.httpStudentService.getStudentsBySubjectAndTeacher(teacherId, subjectName)
        );
      }),
      concatMap(([{ teacherId, subjectName }, students]) => {
        return [
          getStudentsBySelectedSubjectSuccess({ students }),
          getDates({ subjectName })
        ];
      })
    )
  );

  getTeachersFromOtherSubject$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getTeachersFromOtherSubject),
      switchMap(({ teacherListForCurrentSubject }) => this.httpTeacherService
        .getTeachersFromOtherSubject(teacherListForCurrentSubject)),
      map((teachersFromOtherSubjects: Teacher[]) => getTeachersFromOtherSubjectSuccess({
        teachersFromOtherSubjects
      }))
    )
  );

  saveChanges$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(saveChanges),
      withLatestFrom(this.store.pipe(select(selectSelectedTeacher))),
      concatMap(([{ subjectName, teacherId }, { id }]) => {
        if (id && teacherId !== id) {
          return [
            deleteEmptyMarks(),
            getDates({ subjectName }),
            updateTeachersFromOtherSubject(),
            updateInfoInDatabase({ subjectName, teacherId, newTeacherId: id }),
          ];
        } else {
          return [
            deleteEmptyMarks(),
            getDates({ subjectName }),
            updateInfoInDatabase({ subjectName, teacherId, newTeacherId: id }),
          ];
        }
      })
    )
  );

  updateInfoInDatabase$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(updateInfoInDatabase),
      withLatestFrom(this.store.pipe(select(selectStudentListBySubject))),
      mergeMap(([{ subjectName, teacherId, newTeacherId }, students]) => {

        const studentsPipe$ = this.httpStudentService.updateStudents(students);
        let resultPipe$ = studentsPipe$;

        if (newTeacherId && teacherId !== newTeacherId) {

          const teachersPipe$ = this.httpSubjectService.updateSubjectTeachersId({
            subjectName,
            teacherId,
            newTeacherId,
          })

          resultPipe$ = combineLatest(studentsPipe$, teachersPipe$);
        }

        return resultPipe$.pipe(
          map(() => updateDataSaved({ save: true })),
          catchError(() => of(updateDataSaved({ save: false })))
        );
      })
    )
  );

  updateTeachersFromOtherSubject$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTeachersFromOtherSubject.type),
      withLatestFrom(this.store.pipe(select(selectSelectedSubject))),
      switchMap(([props, subject]) => this.httpTeacherService
        .getTeachersFromOtherSubject(subject.teachersID)),
      map((teachersFromOtherSubjects: Teacher[]) => getTeachersFromOtherSubjectSuccess({
        teachersFromOtherSubjects
      }))
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

import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';

import { HttpSubjectService } from '../../../../common/services/subjects/http-subject.service';
import { HttpTeacherService } from '../../../../common/services/teachers/http-teacher.service';
import { Subject } from '../../../../common/entities/subject';
import { Teacher } from '../../../../common/entities/teacher';

import {
  getTeacherListbySubject,
  getTeacherListbySubjectSuccess,
} from './subject-teachers.actions';

@Injectable()
export class SubjectTeachersEffects {
  getTeacherListBySubject$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getTeacherListbySubject.type),
      concatMap(({ subjectName }) => this.httpSubjectService.getSubjectByName(subjectName)),
      concatMap((subject: Subject) => this.httpTeacherService.getTeachersListById(subject.teachersID)),
      map((teachersBySubject: Teacher[]) => getTeacherListbySubjectSuccess({
        teachersBySubject
      }))
    )
  );

  constructor(
    private httpSubjectService: HttpSubjectService,
    private httpTeacherService: HttpTeacherService,
    private actions$: Actions,
  ) { }
}

import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import {
  ESubjectActions,
  GetSubjects,
  GetSubjectsSuccess,
  AddNewSubject,
  AddNewSubjectSuccess,
  UpdateSubjectTeachersId,
  UpdateSubjectTeachersIdSuccess,
  INewSubjectInfo
} from '../actions/subject.actions';
import { HttpSubjectService } from '../../../common/services/subjects/http-subject.service';
import { Subject } from '../../../common/entities/subject';

@Injectable()
export class SubjectEffects {
  @Effect()
  getSubjects$: Observable<Action> = this._actions$.pipe(
    ofType<GetSubjects>(ESubjectActions.GetSubjects),
    switchMap(() => this._httpSubjectService.getSubjects()),
    switchMap((subjects: Subject[]) => of(new GetSubjectsSuccess(subjects)))
  );

  @Effect()
  addNewSubject$ = this._actions$.pipe(
    ofType<AddNewSubject>(ESubjectActions.AddNewSubject),
    map((action) => action.payload),
    switchMap((newSubject) => {
      return this._httpSubjectService.addNewSubject(newSubject);
    }),
    switchMap((subject: Subject) => of(new AddNewSubjectSuccess(subject)))
  );

  @Effect()
  updateSubjectTeachersId$: Observable<Action> = this._actions$.pipe(
    ofType<UpdateSubjectTeachersId>(ESubjectActions.UpdateSubjectTeachersId),
    map((action) => action.payload),
    switchMap((subjectInfo: INewSubjectInfo) =>
      this._httpSubjectService.updateSubjectTeachersId(subjectInfo)),
    switchMap((subject: Subject) => of(new UpdateSubjectTeachersIdSuccess(subject)))
  );

  constructor(
    private _httpSubjectService: HttpSubjectService,
    private _actions$: Actions
  ) { }
}
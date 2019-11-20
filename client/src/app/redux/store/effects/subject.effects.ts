import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
  ESubjectActions,
  GetSubjects,
  GetSubjectsSuccess
} from '../actions/subject.actions';
import { SubjectsTableService } from '../../../common/services/subjects/subjects-table.service';
import { Subject } from '../../../common/entities/subject';

@Injectable()
export class SubjectEffects {
  @Effect()
  getSubjects$: Observable<Action> = this._actions$.pipe(
    ofType<GetSubjects>(ESubjectActions.GetSubjects),
    switchMap(() => this.subjectsTableService.getSubjects()),
    switchMap((subjects: Subject[]) => of(new GetSubjectsSuccess(subjects)))
  );

  constructor(
    private subjectsTableService: SubjectsTableService,
    private _actions$: Actions
  ) { }
}
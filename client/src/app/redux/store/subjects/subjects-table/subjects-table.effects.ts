import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { HttpSubjectService } from '../../../../common/services/subjects/http-subject.service';
import { Subject } from '../../../../common/entities/subject';

import { getSubjectList, getSubjectListSuccess } from './subjects-table.actions';

@Injectable()
export class SubjectsTableEffects {
  getSubjectList$: Observable<Action> = createEffect(() =>
    this._actions$.pipe(
      ofType(getSubjectList.type),
      mergeMap(() => this._httpSubjectService.getSubjects().pipe(
        map((subjects: Subject[]) => getSubjectListSuccess({ subjects }))
      )),
    )
  );

  constructor(
    private _httpSubjectService: HttpSubjectService,
    private _actions$: Actions,
  ) { }
}

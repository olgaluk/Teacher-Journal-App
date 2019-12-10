import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { HttpSubjectService } from '../../../../common/services/subjects/http-subject.service';
import { Subject } from '../../../../common/entities/subject';

import { getSubjectList, getSubjectListSuccess } from './subjects-table.actions';

@Injectable()
export class SubjectsTableEffects {
  getSubjectList$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getSubjectList.type),
      switchMap(() => this.httpSubjectService.getSubjects()),
      map((subjects: Subject[]) => getSubjectListSuccess({ subjects }))
    )
  );

  constructor(
    private httpSubjectService: HttpSubjectService,
    private actions$: Actions,
  ) { }
}

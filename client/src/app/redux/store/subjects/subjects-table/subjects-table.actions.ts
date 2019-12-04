import { createAction, props } from '@ngrx/store';

import { Subject } from '../../../../common/entities/subject';

export enum ESubjectsTableActions {
  GetSubjects = '[SubjectsTable] Get subject list',
  GetSubjectsSuccess = '[SubjectsTable] Get subject list success',
  Reset = '[SubjectsTable] Reset subject list'
}

export const getSubjectList = createAction(
  ESubjectsTableActions.GetSubjects,
);

export const getSubjectListSuccess = createAction(
  ESubjectsTableActions.GetSubjectsSuccess,
  props<{ subjects: Subject[] }>()
);

export const reset = createAction(
  ESubjectsTableActions.Reset
);
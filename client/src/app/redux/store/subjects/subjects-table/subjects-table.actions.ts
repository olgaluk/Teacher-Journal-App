import { createAction, props } from '@ngrx/store';

import { Subject } from '../../../../common/entities/subject';

interface ITypeActions {
  getSubjects: string;
  getSubjectsSuccess: string;
  reset: string;
}

const BLOCK = '[SubjectsTable]';

const subjectsTableActions: ITypeActions = {
  getSubjects: `${BLOCK} Get subject list`,
  getSubjectsSuccess: `${BLOCK} Get subject list success`,
  reset: `${BLOCK} Reset subject list`,
}

export const getSubjectList = createAction(
  subjectsTableActions.getSubjects,
);

export const getSubjectListSuccess = createAction(
  subjectsTableActions.getSubjectsSuccess,
  props<{ subjects: Subject[] }>()
);

export const reset = createAction(
  subjectsTableActions.reset
);
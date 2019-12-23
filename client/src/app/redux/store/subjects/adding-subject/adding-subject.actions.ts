import { createAction, props } from '@ngrx/store';

import { Teacher } from '../../../../common/entities/teacher';

interface ITypeActions {
  getTeacherList: string;
  getTeacherListSuccess: string;
  addNewSubject: string;
  updateDataSaved: string;
  reset: string;
}

const BLOCK: string = '[AddingSubject]';

const addingSubjectActions: ITypeActions = {
  getTeacherList: `${BLOCK} Get teacher list`,
  getTeacherListSuccess: `${BLOCK} Get teacher list success`,
  addNewSubject: `${BLOCK} Add new subject`,
  updateDataSaved: `${BLOCK} Update data saved`,
  reset: `${BLOCK} Reset student info`,
}

export const getTeacherList = createAction(
  addingSubjectActions.getTeacherList
);

export const getTeacherListSuccess = createAction(
  addingSubjectActions.getTeacherListSuccess,
  props<{ teacherList: Teacher[] }>()
);

export const addNewSubject = createAction(
  addingSubjectActions.addNewSubject,
  props<{
    subjectName: string,
    cabinet: number,
    selectedTeachers: string[],
    description: string,
  }>()
);

export const updateDataSaved = createAction(
  addingSubjectActions.updateDataSaved,
  props<{ dataSaved: boolean }>()
);

export const reset = createAction(
  addingSubjectActions.reset
);

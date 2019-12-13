import { createAction, props } from '@ngrx/store';

import { Teacher } from '../../../../common/entities/teacher';

interface ITypeActions {
  getTeacherList: string;
  getTeacherListSuccess: string;
  updateSubjectName: string;
  updateCabinet: string;
  updateDescription: string;
  updateSelectedTeachersId: string;
  addNewSubject: string;
  updateDataSaved: string;
  reset: string;
}

const BLOCK: string = '[AddingSubject]';

const addingSubjectActions: ITypeActions = {
  getTeacherList: `${BLOCK} Get teacher list`,
  getTeacherListSuccess: `${BLOCK} Get teacher list success`,
  updateSubjectName: `${BLOCK} Update subject name`,
  updateCabinet: `${BLOCK} Update cabinet`,
  updateDescription: `${BLOCK} Update description`,
  updateSelectedTeachersId: `${BLOCK} Update selected teachers id`,
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

export const updateSubjectName = createAction(
  addingSubjectActions.updateSubjectName,
  props<{ subjectName: string }>()
);

export const updateCabinet = createAction(
  addingSubjectActions.updateCabinet,
  props<{ cabinet: number | null }>()
);

export const updateDescription = createAction(
  addingSubjectActions.updateDescription,
  props<{ description: string }>()
);

export const updateSelectedTeachersId = createAction(
  addingSubjectActions.updateSelectedTeachersId,
  props<{ selectedTeachersId: string[] }>()
);

export const addNewSubject = createAction(
  addingSubjectActions.addNewSubject
);

export const updateDataSaved = createAction(
  addingSubjectActions.updateDataSaved,
  props<{ dataSaved: boolean }>()
);

export const reset = createAction(
  addingSubjectActions.reset
);

import { createAction, props } from '@ngrx/store';

import { Teacher } from '../../../../common/entities/teacher';

export enum EAddingSubjectActions {
  GetTeacherList = '[AddingSubject] Get teacher list',
  GetTeacherListSuccess = '[AddingSubject] Get teacher list success',
  UpdateSubjectName = '[AddingSubject] Update subject name',
  UpdateCabinet = '[AddingSubject] Update cabinet',
  UpdateDescription = '[AddingSubject] Update description',
  UpdateSelectedTeachersId = '[AddingSubject] Update selected teachers id',
  AddNewSubject = '[AddingSubject] Add new subject',
  UpdateDataSaved = '[AddingSubject] Update data saved',
  Reset = '[AddingSubject] Reset student info',
}

export const getTeacherList = createAction(
  EAddingSubjectActions.GetTeacherList
);

export const getTeacherListSuccess = createAction(
  EAddingSubjectActions.GetTeacherListSuccess,
  props<{ teacherList: Teacher[] }>()
);

export const updateSubjectName = createAction(
  EAddingSubjectActions.UpdateSubjectName,
  props<{ subjectName: string }>()
);

export const updateCabinet = createAction(
  EAddingSubjectActions.UpdateCabinet,
  props<{ cabinet: number | null }>()
);

export const updateDescription = createAction(
  EAddingSubjectActions.UpdateDescription,
  props<{ description: string }>()
);

export const updateSelectedTeachersId = createAction(
  EAddingSubjectActions.UpdateSelectedTeachersId,
  props<{ selectedTeachersId: string[] }>()
);

export const addNewSubject = createAction(
  EAddingSubjectActions.AddNewSubject
);

export const updateDataSaved = createAction(
  EAddingSubjectActions.UpdateDataSaved,
  props<{ dataSaved: boolean }>()
);

export const reset = createAction(
  EAddingSubjectActions.Reset
);

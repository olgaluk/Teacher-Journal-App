import { createAction, props } from '@ngrx/store';

export enum EAddingStudentActions {
  UpdateName = '[AddingStudent] Update student name',
  UpdateLastName = '[AddingStudent] Update student last name',
  UpdateAge = '[AddingStudent] Update student age',
  UpdateAddress = '[AddingStudent] Update student address',
  AddNewStudent = '[AddingStudent] Add new student',
  UpdateDataSaved = '[AddingStudent] Update data saved',
  Reset = '[AddingStudent] Reset student info',
}

export const updateName = createAction(
  EAddingStudentActions.UpdateName,
  props<{ name: string }>()
);

export const updateLastName = createAction(
  EAddingStudentActions.UpdateLastName,
  props<{ lastName: string }>()
);

export const updateAge = createAction(
  EAddingStudentActions.UpdateAge,
  props<{ age: number | null }>()
);

export const updateAddress = createAction(
  EAddingStudentActions.UpdateAddress,
  props<{ address: string }>()
);

export const addNewStudent = createAction(
  EAddingStudentActions.AddNewStudent
);

export const updateDataSaved = createAction(
  EAddingStudentActions.UpdateDataSaved,
  props<{ dataSaved: boolean }>()
);

export const reset = createAction(
  EAddingStudentActions.Reset
);

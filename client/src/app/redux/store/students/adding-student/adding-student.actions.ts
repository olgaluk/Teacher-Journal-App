import { createAction, props } from '@ngrx/store';

interface ITypeActions {
  updateName: string;
  updateLastName: string;
  updateAge: string;
  updateAddress: string;
  addNewStudent: string;
  updateDataSaved: string;
  reset: string;
}

const BLOCK: string = '[AddingStudent]';

const addingStudentActions: ITypeActions = {
  updateName: `${BLOCK} Update student name`,
  updateLastName: `${BLOCK} Update student last name`,
  updateAge: `${BLOCK} Update student age`,
  updateAddress: `${BLOCK} Update student address`,
  addNewStudent: `${BLOCK} Add new student`,
  updateDataSaved: `${BLOCK} Update data saved`,
  reset: `${BLOCK} Reset student info`,
}

export const updateName = createAction(
  addingStudentActions.updateName,
  props<{ name: string }>()
);

export const updateLastName = createAction(
  addingStudentActions.updateLastName,
  props<{ lastName: string }>()
);

export const updateAge = createAction(
  addingStudentActions.updateAge,
  props<{ age: number | null }>()
);

export const updateAddress = createAction(
  addingStudentActions.updateAddress,
  props<{ address: string }>()
);

export const addNewStudent = createAction(
  addingStudentActions.addNewStudent
);

export const updateDataSaved = createAction(
  addingStudentActions.updateDataSaved,
  props<{ dataSaved: boolean }>()
);

export const reset = createAction(
  addingStudentActions.reset
);

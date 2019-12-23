import { createAction, props } from '@ngrx/store';

interface ITypeActions {
  addNewStudent: string;
  updateDataSaved: string;
}

const BLOCK: string = '[AddingStudent]';

const addingStudentActions: ITypeActions = {
  addNewStudent: `${BLOCK} Add new student`,
  updateDataSaved: `${BLOCK} Update data saved`,
}

export const addNewStudent = createAction(
  addingStudentActions.addNewStudent,
  props<{ name: string, lastName: string, age: number, address: string }>()
);

export const updateDataSaved = createAction(
  addingStudentActions.updateDataSaved,
  props<{ dataSaved: boolean }>()
);

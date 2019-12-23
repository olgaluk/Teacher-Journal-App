import { createReducer, on } from '@ngrx/store';

import { updateDataSaved } from './adding-student.actions';

import {
  IAddingStudentState,
  initialAddingStudentState,
} from './adding-student.state';

const _addingStudentReducers = createReducer(initialAddingStudentState,
  on(
    updateDataSaved,
    (state, { dataSaved }) => ({ ...state, dataSaved })
  ),
);

export function addingStudentReducers(state, action): IAddingStudentState {
  return _addingStudentReducers(state, action);
}

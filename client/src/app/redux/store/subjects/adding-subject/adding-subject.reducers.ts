import { createReducer, on } from '@ngrx/store';

import {
  getTeacherListSuccess,
  updateDataSaved,
  reset,
} from './adding-subject.actions';

import {
  IAddingSubjectState,
  initialAddingSubjectState,
} from './adding-subject.state';

const _addingSubjectReducers = createReducer(initialAddingSubjectState,
  on(
    getTeacherListSuccess,
    (state, { teacherList }) => ({ ...state, teacherList })
  ),
  on(
    updateDataSaved,
    (state, { dataSaved }) => ({ ...state, dataSaved })
  ),
  on(
    reset,
    () => (initialAddingSubjectState)
  )
);

export function addingSubjectReducers(state, action): IAddingSubjectState {
  return _addingSubjectReducers(state, action);
}

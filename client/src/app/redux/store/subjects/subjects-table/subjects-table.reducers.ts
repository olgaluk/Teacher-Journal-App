import { createReducer, on } from '@ngrx/store';

import {
  getSubjectListSuccess,
  reset,
} from './subjects-table.actions';

import {
  ISubjectsTableState,
  initialSubjectsTableState,
} from './subjects-table.state';

const _subjectsTableReducers = createReducer(initialSubjectsTableState,
  on(
    getSubjectListSuccess,
    (state, { subjects }) => ({ ...state, subjects })
  ),
  on(
    reset,
    () => initialSubjectsTableState
  )
);

export function subjectsTableReducers(state, action): ISubjectsTableState {
  return _subjectsTableReducers(state, action);
}
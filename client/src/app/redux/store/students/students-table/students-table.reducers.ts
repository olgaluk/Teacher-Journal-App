import { createReducer, on } from '@ngrx/store';

import {
  getStudentListSuccess,
  getStudentsByNameSuccess,
  updateSearchValue,
  reset,
} from './students-table.actions';

import {
  IStudentsTableState,
  initialStudentsTableState,
} from './students-table.state';

const _studentsTableReducers = createReducer(initialStudentsTableState,
  on(
    getStudentListSuccess,
    (state, { studentList }) => ({ ...state, studentList })
  ),
  on(
    getStudentsByNameSuccess,
    (state, { searchedStudents }) => ({ ...state, studentList: searchedStudents })
  ),
  on(
    updateSearchValue,
    (state, { searchValue }) => ({ ...state, searchValue })
  ),
  on(
    reset,
    () => initialStudentsTableState
  )
);

export function studentsTableReducers(state, action): IStudentsTableState {
  return _studentsTableReducers(state, action);
}
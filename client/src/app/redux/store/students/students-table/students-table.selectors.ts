import { createSelector } from '@ngrx/store';

import { IAppState } from '../../app.state';
import { IStudentsTableState } from './students-table.state';

const selectStudentsTable = (state: IAppState) => state.studentsTable;

export const selectStudentList = createSelector(
  selectStudentsTable,
  (state: IStudentsTableState) => state.studentList
);

export const selectSearchValue = createSelector(
  selectStudentsTable,
  (state: IStudentsTableState) => state.searchValue
);
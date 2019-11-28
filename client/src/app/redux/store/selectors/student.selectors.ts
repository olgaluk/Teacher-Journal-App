import { createSelector } from '@ngrx/store';

import { IAppState } from '../app.state';
import { IStudentState } from '../state/student.state';

const selectStudents = (state: IAppState) => state.students;

export const selectStudentList = createSelector(
  selectStudents,
  (state: IStudentState) => state.students
);

export const selectSearchedStudents = createSelector(
  selectStudents,
  (state: IStudentState) => state.searchedStudents
);

export const selectStudentListBySubject = createSelector(
  selectStudents,
  (state: IStudentState) => state.selectedStudentsBySubject
);

export const selectDates = createSelector(
  selectStudents,
  (state: IStudentState) => state.dates
);
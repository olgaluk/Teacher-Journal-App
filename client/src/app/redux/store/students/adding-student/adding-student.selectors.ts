import { createSelector } from '@ngrx/store';

import { IAppState } from '../../app.state';
import { IAddingStudentState } from './adding-student.state';

const selectAddingStudent = (state: IAppState) => state.addingStudent;

export const selectDataSaved = createSelector(
  selectAddingStudent,
  (state: IAddingStudentState) => state.dataSaved
);

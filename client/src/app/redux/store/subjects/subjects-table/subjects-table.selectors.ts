import { createSelector } from '@ngrx/store';

import { IAppState } from '../../app.state';
import { ISubjectsTableState } from './subjects-table.state';

const selectSubjectsTable = (state: IAppState) => state.subjectsTable;

export const selectSubjectList = createSelector(
  selectSubjectsTable,
  (state: ISubjectsTableState) => state.subjects
);

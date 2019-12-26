import { createSelector } from '@ngrx/store';

import { IAppState } from '../../app.state';
import { IAddingSubjectState } from './adding-subject.state';

const selectAddingSubject = (state: IAppState) => state.addingSubject;

export const selectTeacherList = createSelector(
  selectAddingSubject,
  (state: IAddingSubjectState) => state.teacherList
);

export const selectDataSaved = createSelector(
  selectAddingSubject,
  (state: IAddingSubjectState) => state.dataSaved
);

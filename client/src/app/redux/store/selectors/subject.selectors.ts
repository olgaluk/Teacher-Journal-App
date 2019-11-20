import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { ISubjectState } from '../state/subject.state';

const selectSubjects = (state: IAppState) => state.subjects;

export const selectSubjectList = createSelector(
  selectSubjects,
  (state: ISubjectState) => state.subjects
);
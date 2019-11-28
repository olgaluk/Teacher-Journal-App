import { createSelector } from '@ngrx/store';

import { IAppState } from '../app.state';
import { ISubjectState } from '../state/subject.state';

const selectSubjects = (state: IAppState) => state.subjects;

export const selectSubjectList = createSelector(
  selectSubjects,
  (state: ISubjectState) => state.subjects
);

export const selectSelectedSubject = createSelector(
  selectSubjects,
  (state: ISubjectState) => state.selectedSubject
);
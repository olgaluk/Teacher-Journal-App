import { createSelector } from '@ngrx/store';

import { IAppState } from '../../app.state';
import { ISubjectDetailState } from '../subject-detail/subject-detail.state';

const selectSubjectDetail = (state: IAppState) => state.subjectDetail;

export const selectSelectedSubject = createSelector(
  selectSubjectDetail,
  (state: ISubjectDetailState) => state.selectedSubject
);

export const selectSelectedTeacher = createSelector(
  selectSubjectDetail,
  (state: ISubjectDetailState) => state.selectedTeacher
);

export const selectStudentListBySubject = createSelector(
  selectSubjectDetail,
  (state: ISubjectDetailState) => state.selectedStudentsBySubject
);

export const selectDates = createSelector(
  selectSubjectDetail,
  (state: ISubjectDetailState) => state.dates
);
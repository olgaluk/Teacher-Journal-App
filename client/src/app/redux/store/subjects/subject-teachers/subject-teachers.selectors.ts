import { createSelector } from '@ngrx/store';

import { IAppState } from '../../app.state';
import { ISubjectTeachersState } from './subject-teachers.state';

const selectSubjectTeachers = (state: IAppState) => state.subjectTeachers;

export const selectTeacherListBySubject = createSelector(
  selectSubjectTeachers,
  (state: ISubjectTeachersState) => state.teachersBySubject
);

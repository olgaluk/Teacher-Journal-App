import { createSelector } from '@ngrx/store';

import { IAppState } from '../app.state';
import { ITeacherState } from '../state/teacher.state';

const selectTeachers = (state: IAppState) => state.teachers;

export const selectTeacherList = createSelector(
  selectTeachers,
  (state: ITeacherState) => state.teachers
);

export const selectTeacherListBySubject = createSelector(
  selectTeachers,
  (state: ITeacherState) => state.teachersBySubject
);

export const selectSelectedTeacher = createSelector(
  selectTeachers,
  (state: ITeacherState) => state.selectedTeacher
);

export const selectTeachersFromOtherSubjects = createSelector(
  selectTeachers,
  (state: ITeacherState) => state.teachersFromOtherSubjects
);
import { ActionReducerMap } from '@ngrx/store';

import { routerReducer } from '@ngrx/router-store';
import { IAppState } from './app.state';

import { subjectDetailReducers } from './subjects/subject-detail/subject-detail.reducers';
import { subjectsTableReducers } from './subjects/subjects-table/subjects-table.reducers';
import { subjectTeachersReducers } from './subjects/subject-teachers/subject-teachers.reducers';
import { studentsTableReducers } from './students/students-table/students-table.reducers';
import { addingStudentReducers } from './students/adding-student/adding-student.reducers';
import { addingSubjectReducers } from './subjects/adding-subject/adding-subject.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  subjectDetail: subjectDetailReducers,
  subjectsTable: subjectsTableReducers,
  subjectTeachers: subjectTeachersReducers,
  studentsTable: studentsTableReducers,
  addingStudent: addingStudentReducers,
  addingSubject: addingSubjectReducers,
};

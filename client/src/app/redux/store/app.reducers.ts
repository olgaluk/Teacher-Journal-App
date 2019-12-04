import { ActionReducerMap } from '@ngrx/store';

import { routerReducer } from '@ngrx/router-store';
import { IAppState } from './app.state';
import { studentReducers } from './reducers/student.reducers';
import { subjectReducers } from './reducers/subject.reducers';
import { teacherReducers } from './reducers/teacher.reducers';

import { subjectDetailReducers } from './subjects/subject-detail/subject-detail.reducers';
import { subjectsTableReducers } from './subjects/subjects-table/subjects-table.reducers';
import { subjectTeachersReducers } from './subjects/subject-teachers/subject-teachers.reducers';
import { studentsTableReducers } from './students/students-table/students-table.reducers';
import { addingStudentReducers } from './students/adding-student/adding-student.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  students: studentReducers,
  subjects: subjectReducers,
  teachers: teacherReducers,
  subjectDetail: subjectDetailReducers,
  subjectsTable: subjectsTableReducers,
  subjectTeachers: subjectTeachersReducers,
  studentsTable: studentsTableReducers,
  addingStudent: addingStudentReducers,
};

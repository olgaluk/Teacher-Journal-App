import { ActionReducerMap } from '@ngrx/store';

import { routerReducer } from '@ngrx/router-store';
import { IAppState } from '../app.state';
import { studentReducers } from '../reducers/student.reducers';
import { subjectReducers } from '../reducers/subject.reducers';
import { teacherReducers } from '../reducers/teacher.reducers';

import { subjectDetailReducers } from '../subjects/subject-detail/subject-detail.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  students: studentReducers,
  subjects: subjectReducers,
  teachers: teacherReducers,
  subjectDetail: subjectDetailReducers,
};
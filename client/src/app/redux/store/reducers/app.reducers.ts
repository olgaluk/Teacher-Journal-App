import { ActionReducerMap } from '@ngrx/store';

import { routerReducer } from '@ngrx/router-store';
import { IAppState } from '../state/app.state';
import { studentReducers } from '../reducers/student.reducers';
import { subjectReducers } from '../reducers/subject.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  students: studentReducers,
  subjects: subjectReducers
};
import { createReducer, on } from '@ngrx/store';

import { getTeacherListbySubjectSuccess, reset } from './subject-teachers.actions';

import {
  ISubjectTeachersState,
  initialSubjectTeachersState,
} from './subject-teachers.state';

const _subjectTeachersReducers = createReducer(initialSubjectTeachersState,
  on(
    getTeacherListbySubjectSuccess,
    (state, { teachersBySubject }) => ({ ...state, teachersBySubject })
  ),
  on(
    reset,
    () => initialSubjectTeachersState
  )
);

export function subjectTeachersReducers(state, action): ISubjectTeachersState {
  return _subjectTeachersReducers(state, action);
}
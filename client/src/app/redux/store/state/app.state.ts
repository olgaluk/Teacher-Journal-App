import { RouterReducerState } from '@ngrx/router-store';

import { IStudentState, initialStudentState } from './student.state';
import { ISubjectState, initialSubjectState } from './subject.state';
import { ITeacherState, initialTeacherState } from './teacher.state';

export interface IAppState {
  router?: RouterReducerState;
  students: IStudentState;
  subjects: ISubjectState;
  teachers: ITeacherState;
}

export const initialAppState: IAppState = {
  students: initialStudentState,
  subjects: initialSubjectState,
  teachers: initialTeacherState
}

export function getInitialState(): IAppState {
  return initialAppState;
}
import { RouterReducerState } from '@ngrx/router-store';

import { IStudentState, initialStudentState } from './student.state';
import { ISubjectState, initialSubjectState } from './subject.state';

export interface IAppState {
  router?: RouterReducerState;
  students: IStudentState;
  subjects: ISubjectState;
}

export const initialAppState: IAppState = {
  students: initialStudentState,
  subjects: initialSubjectState
}

export function getInitialState(): IAppState {
  return initialAppState;
}
import { RouterReducerState } from '@ngrx/router-store';

import { IStudentState, initialStudentState } from './state/student.state';
import { ISubjectState, initialSubjectState } from './state/subject.state';
import { ITeacherState, initialTeacherState } from './state/teacher.state';


import {
  ISubjectDetailState,
  initialSubjectDetailState
} from './subjects/subject-detail/subject-detail.state';

export interface IAppState {
  router?: RouterReducerState;
  students: IStudentState;
  subjects: ISubjectState;
  teachers: ITeacherState;
  subjectDetail: ISubjectDetailState;
}

export const initialAppState: IAppState = {
  students: initialStudentState,
  subjects: initialSubjectState,
  teachers: initialTeacherState,
  subjectDetail: initialSubjectDetailState,
}

export function getInitialState(): IAppState {
  return initialAppState;
}
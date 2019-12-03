import { RouterReducerState } from '@ngrx/router-store';

import { IStudentState, initialStudentState } from './state/student.state';
import { ISubjectState, initialSubjectState } from './state/subject.state';
import { ITeacherState, initialTeacherState } from './state/teacher.state';

import {
  IStudentsTableState,
  initialStudentsTableState
} from './students/students-table/students-table.state'

import {
  ISubjectsTableState,
  initialSubjectsTableState
} from './subjects/subjects-table/subjects-table.state';

import {
  ISubjectTeachersState,
  initialSubjectTeachersState
} from './subjects/subject-teachers/subject-teachers.state';

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
  subjectsTable: ISubjectsTableState;
  subjectTeachers: ISubjectTeachersState;
  studentsTable: IStudentsTableState;
}

export const initialAppState: IAppState = {
  students: initialStudentState,
  subjects: initialSubjectState,
  teachers: initialTeacherState,
  subjectDetail: initialSubjectDetailState,
  subjectsTable: initialSubjectsTableState,
  subjectTeachers: initialSubjectTeachersState,
  studentsTable: initialStudentsTableState,
}

export function getInitialState(): IAppState {
  return initialAppState;
}
import { RouterReducerState } from '@ngrx/router-store';

import {
  IAddingSubjectState,
  initialAddingSubjectState,
} from './subjects/adding-subject/adding-subject.state';

import {
  IAddingStudentState,
  initialAddingStudentState
} from './students/adding-student/adding-student.state';

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
  subjectDetail: ISubjectDetailState;
  subjectsTable: ISubjectsTableState;
  subjectTeachers: ISubjectTeachersState;
  studentsTable: IStudentsTableState;
  addingStudent: IAddingStudentState;
  addingSubject: IAddingSubjectState;
}

export const initialAppState: IAppState = {
  subjectDetail: initialSubjectDetailState,
  subjectsTable: initialSubjectsTableState,
  subjectTeachers: initialSubjectTeachersState,
  studentsTable: initialStudentsTableState,
  addingStudent: initialAddingStudentState,
  addingSubject: initialAddingSubjectState,
}

export function getInitialState(): IAppState {
  return initialAppState;
}

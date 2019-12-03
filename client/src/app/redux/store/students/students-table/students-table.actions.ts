import { createAction, props } from '@ngrx/store';

import { Student } from '../../../../common/entities/student';

export enum EStudentsTableActions {
  GetStudentList = '[StudentsTable] Get student list',
  GetStudentListSuccess = '[StudentsTable] Get student list success',
  GetStudentsByName = '[StudentsTable] Get students by name or last name',
  GetStudentsByNameSuccess = '[StudentsTable] Get students by name or last name success',
  Reset = '[StudentsTable] Reset student list',
}

export const getStudentList = createAction(
  EStudentsTableActions.GetStudentList
);

export const getStudentListSuccess = createAction(
  EStudentsTableActions.GetStudentListSuccess,
  props<{ studentList: Student[] }>()
);

export const getStudentsByName = createAction(
  EStudentsTableActions.GetStudentsByName,
  props<{ inputName: string }>()
);

export const getStudentsByNameSuccess = createAction(
  EStudentsTableActions.GetStudentsByNameSuccess,
  props<{ searchedStudents: Student[] }>()
);

export const reset = createAction(
  EStudentsTableActions.Reset
);
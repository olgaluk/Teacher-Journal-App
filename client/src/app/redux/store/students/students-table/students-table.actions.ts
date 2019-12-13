import { createAction, props } from '@ngrx/store';

import { Student } from '../../../../common/entities/student';

interface ITypeActions {
  getStudentList: string;
  getStudentListSuccess: string;
  getStudentsByName: string;
  getStudentsByNameSuccess: string;
  updateSearchValue: string;
  reset: string;
}

const BLOCK: string = '[StudentsTable]';

const studentsTableActions: ITypeActions = {
  getStudentList: `${BLOCK} Get student list`,
  getStudentListSuccess: `${BLOCK} Get student list success`,
  getStudentsByName: `${BLOCK} Get students by name or last name`,
  getStudentsByNameSuccess: `${BLOCK} Get students by name or last name success`,
  updateSearchValue: `${BLOCK} Update search value`,
  reset: `${BLOCK} Reset student list`,
}

export const getStudentList = createAction(
  studentsTableActions.getStudentList
);

export const getStudentListSuccess = createAction(
  studentsTableActions.getStudentListSuccess,
  props<{ studentList: Student[] }>()
);

export const getStudentsByName = createAction(
  studentsTableActions.getStudentsByName,
);

export const getStudentsByNameSuccess = createAction(
  studentsTableActions.getStudentsByNameSuccess,
  props<{ searchedStudents: Student[] }>()
);

export const updateSearchValue = createAction(
  studentsTableActions.updateSearchValue,
  props<{ searchValue: string }>()
);

export const reset = createAction(
  studentsTableActions.reset
);
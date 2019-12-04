import { createSelector } from '@ngrx/store';

import { IAppState } from '../../app.state';
import { IAddingStudentState } from './adding-student.state';
import { state } from '@angular/animations';

const selectAddingStudent = (state: IAppState) => state.addingStudent;

export const selectName = createSelector(
  selectAddingStudent,
  (state: IAddingStudentState) => state.name
);

export const selectLastName = createSelector(
  selectAddingStudent,
  (state: IAddingStudentState) => state.lastName
);

export const selectAge = createSelector(
  selectAddingStudent,
  (state: IAddingStudentState) => state.age
);

export const selectAddress = createSelector(
  selectAddingStudent,
  (state: IAddingStudentState) => state.address
);

export const selectNameInfo = createSelector(
  selectAddingStudent,
  (state: IAddingStudentState) => state.nameInfo
);

export const selectLastNameInfo = createSelector(
  selectAddingStudent,
  (state: IAddingStudentState) => state.lastNameInfo
);

export const selectAgeInfo = createSelector(
  selectAddingStudent,
  (state: IAddingStudentState) => state.ageInfo
);

export const selectAddressInfo = createSelector(
  selectAddingStudent,
  (state: IAddingStudentState) => state.addressInfo
);

export const selectDataSaved = createSelector(
  selectAddingStudent,
  (state: IAddingStudentState) => state.dataSaved
);

export const selectValuesСorrectness = createSelector(
  selectAddingStudent,
  (state: IAddingStudentState) => state.valuesСorrectness
);

export const selectStudentInfo = createSelector(
  selectAddingStudent,
  (state: IAddingStudentState) => ({
    name: state.name,
    lastName: state.lastName,
    age: state.age,
    address: state.address,
  })
);

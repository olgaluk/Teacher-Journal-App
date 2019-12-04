import { createReducer, on } from '@ngrx/store';

import {
  updateName,
  updateLastName,
  updateAge,
  updateAddress,
  updateDataSaved,
  reset,
} from './adding-student.actions';

import {
  IAddingStudentState,
  initialAddingStudentState,
} from './adding-student.state';

import { EMessageForName } from '../../../../common/constants/info-message-for-name';
import { EMessageForLastName } from '../../../../common/constants/info-message-for-last-name';
import { EMessageForAge } from '../../../../common/constants/info-message-for-age';
import { EMessageForAddress } from '../../../../common/constants/info-message-for-address';

const _addingStudentReducers = createReducer(initialAddingStudentState,
  on(
    updateName,
    (state, { name }) => (updateNameInState(state, name))
  ),
  on(
    updateLastName,
    (state, { lastName }) => (updateLastNameInState(state, lastName))
  ),
  on(
    updateAge,
    (state, { age }) => (updateAgeInState(state, age))
  ),
  on(
    updateAddress,
    (state, { address }) => (updateAddressInState(state, address))
  ),
  on(
    updateDataSaved,
    (state, { dataSaved }) => ({ ...state, dataSaved })
  ),
  on(
    reset,
    () => initialAddingStudentState
  )
);

export function addingStudentReducers(state, action): IAddingStudentState {
  return _addingStudentReducers(state, action);
}

const updateNameInState = (
  state: IAddingStudentState,
  name: string,
): IAddingStudentState => {
  let nameInfo: string | null = null;
  if (!name) {
    nameInfo = EMessageForName.EmptyField;
  }
  if (name.length < 2) {
    nameInfo = EMessageForName.LengthBottomLine;
  }

  const { lastNameInfo, ageInfo, addressInfo, lastName, age, address } = state;
  const valuesСorrectness = (!nameInfo &&
    !lastNameInfo &&
    !ageInfo &&
    !addressInfo &&
    !!lastName &&
    !!age &&
    !!address);

  return {
    ...state,
    name,
    nameInfo,
    valuesСorrectness,
  }
}

const updateLastNameInState = (
  state: IAddingStudentState,
  lastName: string,
): IAddingStudentState => {
  let lastNameInfo: string | null = null;
  if (!lastName) {
    lastNameInfo = EMessageForLastName.EmptyField;
  }
  if (lastName.length < 2) {
    lastNameInfo = EMessageForLastName.LengthBottomLine;
  }

  const { nameInfo, ageInfo, addressInfo, name, age, address } = state;
  const valuesСorrectness = (!lastNameInfo &&
    !nameInfo &&
    !ageInfo &&
    !addressInfo &&
    !!name &&
    !!age &&
    !!address);

  return {
    ...state,
    lastName,
    lastNameInfo,
    valuesСorrectness,
  }
}

const updateAgeInState = (
  state: IAddingStudentState,
  age: number | null,
): IAddingStudentState => {
  let ageInfo: string | null = null;
  if (!age && age !== 0) {
    ageInfo = EMessageForAge.EmptyField;
  }
  if (age < 17) {
    ageInfo = EMessageForAge.ValueBottomLine;
  }
  if (age > 24) {
    ageInfo = EMessageForAge.ValueTopLine;
  }

  const { lastNameInfo, nameInfo, addressInfo, lastName, name, address } = state;
  const valuesСorrectness = (!ageInfo &&
    !lastNameInfo &&
    !nameInfo &&
    !addressInfo &&
    !!lastName &&
    !!name &&
    !!address);

  return {
    ...state,
    age,
    ageInfo,
    valuesСorrectness,
  }
}

const updateAddressInState = (
  state: IAddingStudentState,
  address: string,
): IAddingStudentState => {
  let addressInfo: string | null = null;
  if (!address) {
    addressInfo = EMessageForAddress.EmptyField;
  }
  if (address.length < 6) {
    addressInfo = EMessageForAddress.LengthBottomLine;
  }

  const { lastNameInfo, ageInfo, nameInfo, lastName, age, name } = state;
  const valuesСorrectness = (!addressInfo &&
    !lastNameInfo &&
    !ageInfo &&
    !nameInfo &&
    !!lastName &&
    !!age &&
    !!name);

  return {
    ...state,
    address,
    addressInfo,
    valuesСorrectness,
  }
}

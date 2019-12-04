import { createReducer, on } from '@ngrx/store';

import {
  getTeacherListSuccess,
  updateSubjectName,
  updateCabinet,
  updateDescription,
  updateSelectedTeachersId,
  updateDataSaved,
  reset,
} from './adding-subject.actions';

import {
  IAddingSubjectState,
  initialAddingSubjectState,
} from './adding-subject.state';

import { EMessageForSubject } from '../../../../common/constants/info-message-for-subject';
import { EMessageForCabinet } from '../../../../common/constants/info-message-for-cabinet';

const _addingSubjectReducers = createReducer(initialAddingSubjectState,
  on(
    getTeacherListSuccess,
    (state, { teacherList }) => ({ ...state, teacherList })
  ),
  on(
    updateSubjectName,
    (state, { subjectName }) => (updateSubjectNameInState(state, subjectName))
  ),
  on(
    updateCabinet,
    (state, { cabinet }) => (updateCabinetInState(state, cabinet))
  ),
  on(
    updateDescription,
    (state, { description }) => (updateDescriptionInState(state, description))
  ),
  on(
    updateSelectedTeachersId,
    (state, { selectedTeachersId }) => (updateSelectedTeachersIdInState(state, selectedTeachersId))
  ),
  on(
    updateDataSaved,
    (state, { dataSaved }) => ({ ...state, dataSaved })
  ),
  on(
    reset,
    () => (initialAddingSubjectState)
  )
);

export function addingSubjectReducers(state, action): IAddingSubjectState {
  return _addingSubjectReducers(state, action);
}

const updateSubjectNameInState = (
  state: IAddingSubjectState,
  subjectName: string,
): IAddingSubjectState => {
  let subjectInfo: string | null = null;
  if (!subjectName) {
    subjectInfo = EMessageForSubject.EmptyField;
  }
  if (subjectName.length < 4) {
    subjectInfo = EMessageForSubject.LengthBottomLine;
  }

  const { cabinet, cabinetInfo, selectedTeachersId } = state;
  const valuesСorrectness = (!subjectInfo &&
    !cabinetInfo &&
    !!cabinet &&
    !!(Array.isArray(selectedTeachersId) && selectedTeachersId.length));

  return {
    ...state,
    subjectName,
    subjectInfo,
    valuesСorrectness,
  }
}

const updateCabinetInState = (
  state: IAddingSubjectState,
  cabinet: number | null,
): IAddingSubjectState => {
  let cabinetInfo: string | null = null;
  if (!cabinet && cabinet !== 0) {
    cabinetInfo = EMessageForCabinet.EmptyField;
  }
  if (cabinet < 1) {
    cabinetInfo = EMessageForCabinet.ValueBottomLine;
  }
  if (cabinet > 30) {
    cabinetInfo = EMessageForCabinet.ValueTopLine;
  }

  const { subjectName, subjectInfo, selectedTeachersId } = state;
  const valuesСorrectness = (!cabinetInfo &&
    !subjectInfo &&
    !!subjectName &&
    !!(Array.isArray(selectedTeachersId) && selectedTeachersId.length));

  return {
    ...state,
    cabinet,
    cabinetInfo,
    valuesСorrectness,
  }
}

const updateDescriptionInState = (
  state: IAddingSubjectState,
  description: string,
): IAddingSubjectState => {
  const { subjectName, subjectInfo, cabinet, cabinetInfo, selectedTeachersId } = state;
  const valuesСorrectness = (!cabinetInfo &&
    !subjectInfo &&
    !!subjectName &&
    !!cabinet &&
    !!(Array.isArray(selectedTeachersId) && selectedTeachersId.length));

  return {
    ...state,
    description,
    valuesСorrectness,
  }
}

const updateSelectedTeachersIdInState = (
  state: IAddingSubjectState,
  selectedTeachersId: string[],
): IAddingSubjectState => {
  const { subjectName, subjectInfo, cabinet, cabinetInfo } = state;
  const valuesСorrectness = (!cabinetInfo &&
    !subjectInfo &&
    !!subjectName &&
    !!cabinet &&
    !!(Array.isArray(selectedTeachersId) && selectedTeachersId.length));

  return {
    ...state,
    selectedTeachersId,
    valuesСorrectness,
  }
}

import { createSelector } from '@ngrx/store';

import { IAppState } from '../../app.state';
import { IAddingSubjectState } from './adding-subject.state';

const selectAddingSubject = (state: IAppState) => state.addingSubject;

export const selectSubjectName = createSelector(
  selectAddingSubject,
  (state: IAddingSubjectState) => state.subjectName
);

export const selectCabinet = createSelector(
  selectAddingSubject,
  (state: IAddingSubjectState) => state.cabinet
);

export const selectDescription = createSelector(
  selectAddingSubject,
  (state: IAddingSubjectState) => state.description
);

export const selectTeacherList = createSelector(
  selectAddingSubject,
  (state: IAddingSubjectState) => state.teacherList
);

export const selectSubjectInfo = createSelector(
  selectAddingSubject,
  (state: IAddingSubjectState) => state.subjectInfo
);

export const selectCabinetInfo = createSelector(
  selectAddingSubject,
  (state: IAddingSubjectState) => state.cabinetInfo
);

export const selectDataSaved = createSelector(
  selectAddingSubject,
  (state: IAddingSubjectState) => state.dataSaved
);

export const selectValuesСorrectness = createSelector(
  selectAddingSubject,
  (state: IAddingSubjectState) => state.valuesСorrectness
);

export const selectSubject = createSelector(
  selectAddingSubject,
  (state: IAddingSubjectState) => ({
    subjectName: state.subjectName,
    cabinet: state.cabinet,
    description: state.description,
    selectedTeachersId: state.selectedTeachersId,
  })
);

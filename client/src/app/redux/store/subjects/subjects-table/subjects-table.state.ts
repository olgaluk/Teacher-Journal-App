import { Subject } from '../../../../common/entities/subject';

export interface ISubjectsTableState {
  subjects: Subject[];
}

export const initialSubjectsTableState: ISubjectsTableState = {
  subjects: null,
};
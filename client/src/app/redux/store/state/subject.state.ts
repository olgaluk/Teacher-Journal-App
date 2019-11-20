import { Subject } from '../../../common/entities/subject';

export interface ISubjectState {
  subjects: Subject[];
  selectedSubjects: Subject[];
}

export const initialSubjectState: ISubjectState = {
  subjects: null,
  selectedSubjects: null
};
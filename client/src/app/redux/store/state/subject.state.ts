import { Subject } from '../../../common/entities/subject';

export interface ISubjectState {
  subjects: Subject[];
  selectedSubject: Subject;
}

export const initialSubjectState: ISubjectState = {
  subjects: null,
  selectedSubject: null
};
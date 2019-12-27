import { Teacher } from '../../../../common/entities/teacher';

export interface IAddingSubjectState {
  teacherList: Teacher[];
  dataSaved: boolean;
}

export const initialAddingSubjectState: IAddingSubjectState = {
  teacherList: null,
  dataSaved: false,
};

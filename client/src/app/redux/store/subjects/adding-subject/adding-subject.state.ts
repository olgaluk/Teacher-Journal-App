import { Teacher } from '../../../../common/entities/teacher';

export interface IAddingSubjectState {
  subjectName: string;
  cabinet: number | null;
  description: string;
  selectedTeachersId: string[];
  teacherList: Teacher[];
  subjectInfo: string;
  cabinetInfo: string;
  valuesСorrectness: boolean;
  dataSaved: boolean;
}

export const initialAddingSubjectState: IAddingSubjectState = {
  subjectName: null,
  cabinet: null,
  description: null,
  selectedTeachersId: null,
  teacherList: null,
  subjectInfo: null,
  cabinetInfo: null,
  valuesСorrectness: false,
  dataSaved: false,
};

import { Student } from '../../../../common/entities/student';

export interface IStudentsTableState {
  studentList: Student[];
}

export const initialStudentsTableState: IStudentsTableState = {
  studentList: [],
};
import { Student } from '../../../../common/entities/student';

export interface IStudentsTableState {
  studentList: Student[];
  searchValue: string;
}

export const initialStudentsTableState: IStudentsTableState = {
  studentList: [],
  searchValue: '',
};
import { Student } from '../../../../common/entities/student';

export interface IStudentsTableState {
  studentList: Student[];
  searchedStudents: Student[];
}

export const initialStudentsTableState: IStudentsTableState = {
  studentList: null,
  searchedStudents: null,
};
import { Student } from '../../../common/entities/student';

export interface IStudentState {
  students: Student[];
  selectedStudentsBySubject: Student[];
  searchedStudents: Student[];
}

export const initialStudentState: IStudentState = {
  students: null,
  selectedStudentsBySubject: null,
  searchedStudents: null
};
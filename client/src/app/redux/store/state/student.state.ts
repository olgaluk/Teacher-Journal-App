import { Student } from '../../../common/entities/student';

export interface IStudentState {
  students: Student[];
  selectedStudents: Student[];
}

export const initialStudentState: IStudentState = {
  students: null,
  selectedStudents: null
};
import { Teacher } from '../../../common/entities/teacher';

export interface ITeacherState {
  teachers: Teacher[],
  teachersBySubject: Teacher[],
  teachersFromOtherSubjects: Teacher[],
  selectedTeacher: Teacher
}

export const initialTeacherState: ITeacherState = {
  teachers: null,
  teachersBySubject: null,
  teachersFromOtherSubjects: null,
  selectedTeacher: null
};
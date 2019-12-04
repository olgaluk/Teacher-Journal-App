import { Teacher } from '../../../../common/entities/teacher';

export interface ISubjectTeachersState {
  teachersBySubject: Teacher[];
}

export const initialSubjectTeachersState: ISubjectTeachersState = {
  teachersBySubject: null,
};
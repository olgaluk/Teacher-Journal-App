import { Student } from '../../../../common/entities/student';
import { Subject } from '../../../../common/entities/subject';
import { Teacher } from '../../../../common/entities/teacher';

export interface ISubjectDetailState {
  selectedSubject: Subject;
  selectedTeacher: Teacher;
  selectedStudentsBySubject: Student[];
  dates: string[];
  teachersFromOtherSubjects: Teacher[];
  visibilitySaveButton: boolean;
  dataSaved: boolean;
}

export const initialSubjectDetailState: ISubjectDetailState = {
  selectedSubject: null,
  selectedTeacher: null,
  selectedStudentsBySubject: null,
  dates: null,
  teachersFromOtherSubjects: null,
  visibilitySaveButton: false,
  dataSaved: false,
}; 

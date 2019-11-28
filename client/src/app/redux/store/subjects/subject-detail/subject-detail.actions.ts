import { createAction, props } from '@ngrx/store';

import { Subject } from '../../../../common/entities/subject';
import { Teacher } from '../../../../common/entities/teacher';
import { Student } from '../../../../common/entities/student';
import { Mark } from '../../../../common/entities/mark';
import { AcademicPerformance } from '../../../../common/entities/academicPerformance';

export enum ESubjectDetailActions {
  GetInitialInfo = '[SubjectDetail] Get initial info',
  GetSelectedSubject = '[SubjectDetail] Get selected subject',
  GetSelectedSubjectSuccess = '[SubjectDetail] Get selected subject success',
  UpdateSubjectTeachersId = '[SubjectDetail] Update subject teachers id',
  UpdateSubjectTeachersIdSuccess = '[SubjectDetail] Update subject teachers id success',
  GetSelectedTeacher = '[SubjectDetail] Get selected teacher',
  GetSelectedTeacherSuccess = '[SubjectDetail] Get selected teacher success',
  GetTeachersFromOtherSubject = '[SubjectDetail] Get teachers from other subjects',
  GetTeachersFromOtherSubjectSuccess = '[SubjectDetail] Get teachers from other subjects success',
  DeleteTeachersBySubject = '[SubjectDetail] Delete teachers by subject',
  GetStudentsBySelectedSubject = '[SubjectDetail] Get students by selected subject and teacher',
  GetStudentsBySelectedSubjectSuccess = '[SubjectDetail] Get students by selected subject success',
  AddNewStudent = '[SubjectDetail] Add new student',
  AddNewStudentSuccess = '[SubjectDetail] Add new student success',
  UpdateStudents = '[SubjectDetail] Update students',
  GetDates = '[SubjectDetail] Get dates',
  AddEmptyDate = '[SubjectDetail] Add empty date',
  AddEmptyDateSuccess = '[SubjectDetail] Add empty date success',
  ChangeDate = '[SubjectDetail] Change date',
  ChangeDateSuccess = '[SubjectDetail] Change date success',
  AddMark = '[SubjectDetail] Add new mark or change old',
  DeleteEmptyMarks = '[SubjectDetail] Delete empty marks',
  UpdateTeacherInStudents = '[SubjectDetail] Update teacher in students',
}

export const getInitialInfo = createAction(
  ESubjectDetailActions.GetInitialInfo,
  props<{ subjectName: string; teacherId: string }>()
);

export const getSelectedSubject = createAction(
  ESubjectDetailActions.GetSelectedSubject,
  props<{ subjectName: string }>()
);

export const getSelectedSubjectSuccess = createAction(
  ESubjectDetailActions.GetSelectedSubjectSuccess,
  props<{ subject: Subject }>()
);

export const getSelectedTeacher = createAction(
  ESubjectDetailActions.GetSelectedTeacher,
  props<{ teacherId: string }>()
);

export const getSelectedTeacherSuccess = createAction(
  ESubjectDetailActions.GetSelectedTeacherSuccess,
  props<{ teacher: Teacher }>()
);

export const getStudentsBySelectedSubject = createAction(
  ESubjectDetailActions.GetStudentsBySelectedSubject,
  props<{ teacherId: string, subjectId: string }>()
);

export const getStudentsBySelectedSubjectSuccess = createAction(
  ESubjectDetailActions.GetStudentsBySelectedSubjectSuccess,
  props<{ students: Student[] }>()
);

export const getDates = createAction(
  ESubjectDetailActions.GetDates,
  props<{ teacherId: string, subjectId: string }>()
);
import { createAction, props } from '@ngrx/store';

import { Subject } from '../../../../common/entities/subject';
import { Teacher } from '../../../../common/entities/teacher';
import { Student } from '../../../../common/entities/student';

export enum ESubjectDetailActions {
  GetInitialInfo = '[SubjectDetail] Get initial info',
  GetSelectedSubject = '[SubjectDetail] Get selected subject',
  GetSelectedSubjectSuccess = '[SubjectDetail] Get selected subject success',
  GetSelectedTeacher = '[SubjectDetail] Get selected teacher',
  GetSelectedTeacherSuccess = '[SubjectDetail] Get selected teacher success',
  GetStudentsBySelectedSubject = '[SubjectDetail] Get students by selected subject and teacher',
  GetStudentsBySelectedSubjectSuccess = '[SubjectDetail] Get students by selected subject success',
  GetDates = '[SubjectDetail] Get dates',
  GetTeachersFromOtherSubject = '[SubjectDetail] Get teachers from other subjects',
  GetTeachersFromOtherSubjectSuccess = '[SubjectDetail] Get teachers from other subjects success',
  ChangeVisibilitySaveButton = '[SubjectDetail] Change visibility saving button',
  AddEmptyDate = '[SubjectDetail] Add empty date',
  ChangeDate = '[SubjectDetail] Change date',
  ChangeMark = '[SubjectDetail] Add new mark or change old',
  SaveChanges = '[SubjectDetail] Save changes',
  DeleteEmptyMarks = '[SubjectDetail] Delete empty marks',
  UpdateTeacherInStudents = '[SubjectDetail] Update teacher in students',
  UpdateInfoInDatabase = '[SubjectDetail] Update students and subject in database',
  UpdateTeacherListInSubject = '[SubjectDetail] Update teacher list in subject',
  UpdateTeachersFromOtherSubject = '[SubjectDetail] Update teachers from other subject',
  Reset = '[SubjectDetail] Reset',
  UpdateDataSaved = '[SubjectDetail] Update props dataSaved',
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

export const getTeachersFromOtherSubject = createAction(
  ESubjectDetailActions.GetTeachersFromOtherSubject,
  props<{ teacherListForCurrentSubject: string[] }>()
);

export const getTeachersFromOtherSubjectSuccess = createAction(
  ESubjectDetailActions.GetTeachersFromOtherSubjectSuccess,
  props<{ teachersFromOtherSubjects: Teacher[] }>()
);

export const changeVisibilitySaveButton = createAction(
  ESubjectDetailActions.ChangeVisibilitySaveButton,
  props<{ visibility: boolean }>()
);

export const addEmptyDate = createAction(
  ESubjectDetailActions.AddEmptyDate
);

export const changeDate = createAction(
  ESubjectDetailActions.ChangeDate,
  props<{ newDate: string, count: number }>()
);

export const changeMark = createAction(
  ESubjectDetailActions.ChangeMark,
  props<{
    markValue: number,
    date: string,
    studentId: string,
  }>()
);

export const saveChanges = createAction(
  ESubjectDetailActions.SaveChanges,
  props<{ teacherId: string, newTeacherId: string }>()
);

export const deleteEmptyMarks = createAction(
  ESubjectDetailActions.DeleteEmptyMarks
);

export const updateTeacherInStudents = createAction(
  ESubjectDetailActions.UpdateTeacherInStudents,
  props<{ newTeacherId: string }>()
);

export const updateInfoInDatabase = createAction(
  ESubjectDetailActions.UpdateInfoInDatabase,
  props<{ subjectId: string, teacherId: string, newTeacherId: string }>()
);

export const updateTeacherListInSubject = createAction(
  ESubjectDetailActions.UpdateTeacherListInSubject,
  props<{ teacherId: string, newTeacherId: string }>()
);

export const updateTeachersFromOtherSubject = createAction(
  ESubjectDetailActions.UpdateTeachersFromOtherSubject
);

export const reset = createAction(
  ESubjectDetailActions.Reset
);

export const updateDataSaved = createAction(
  ESubjectDetailActions.UpdateDataSaved,
  props<{ save: boolean }>()
);
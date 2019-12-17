import { createAction, props } from '@ngrx/store';

import { Subject } from '../../../../common/entities/subject';
import { Teacher } from '../../../../common/entities/teacher';
import { Student } from '../../../../common/entities/student';

interface ITypeActions {
  getInitialInfo: string;
  getSelectedSubject: string;
  getSelectedSubjectSuccess: string;
  getSelectedTeacher: string;
  getSelectedTeacherSuccess: string;
  getStudentsBySelectedSubject: string;
  getStudentsBySelectedSubjectSuccess: string;
  getDates: string;
  getTeachersFromOtherSubject: string;
  getTeachersFromOtherSubjectSuccess: string;
  changeVisibilitySaveButton: string;
  addEmptyDate: string;
  changeDate: string;
  changeMark: string;
  saveChanges: string;
  deleteEmptyMarks: string;
  updateTeacherInStudents: string;
  updateInfoInDatabase: string;
  updateTeacherListInSubject: string;
  updateTeachersFromOtherSubject: string;
  reset: string;
  updateDataSaved: string;
}

const BLOCK: string = '[SubjectDetail]';

const subjectDetailActions: ITypeActions = {
  getInitialInfo: `${BLOCK} Get initial info`,
  getSelectedSubject: `${BLOCK} Get selected subject`,
  getSelectedSubjectSuccess: `${BLOCK} Get selected subject success`,
  getSelectedTeacher: `${BLOCK} Get selected teacher`,
  getSelectedTeacherSuccess: `${BLOCK} Get selected teacher success`,
  getStudentsBySelectedSubject: `${BLOCK} Get students by selected subject and teacher`,
  getStudentsBySelectedSubjectSuccess: `${BLOCK} Get students by selected subject success`,
  getDates: `${BLOCK} Get dates`,
  getTeachersFromOtherSubject: `${BLOCK} Get teachers from other subjects`,
  getTeachersFromOtherSubjectSuccess: `${BLOCK} Get teachers from other subjects success`,
  changeVisibilitySaveButton: `${BLOCK} Change visibility saving button`,
  addEmptyDate: `${BLOCK} Add empty date`,
  changeDate: `${BLOCK} Change date`,
  changeMark: `${BLOCK} Add new mark or change old`,
  saveChanges: `${BLOCK} Save changes`,
  deleteEmptyMarks: `${BLOCK} Delete empty marks`,
  updateTeacherInStudents: `${BLOCK} Update teacher in students`,
  updateInfoInDatabase: `${BLOCK} Update students and subject in database`,
  updateTeacherListInSubject: `${BLOCK} Update teacher list in subject`,
  updateTeachersFromOtherSubject: `${BLOCK} Update teachers from other subject`,
  reset: `${BLOCK} Reset`,
  updateDataSaved: `${BLOCK} Update props dataSaved`,
}

export const getInitialInfo = createAction(
  subjectDetailActions.getInitialInfo,
  props<{ subjectName: string; teacherId: string }>()
);

export const getSelectedSubject = createAction(
  subjectDetailActions.getSelectedSubject,
  props<{ subjectName: string }>()
);

export const getSelectedSubjectSuccess = createAction(
  subjectDetailActions.getSelectedSubjectSuccess,
  props<{ subject: Subject }>()
);

export const getSelectedTeacher = createAction(
  subjectDetailActions.getSelectedTeacher,
  props<{ teacherId: string }>()
);

export const getSelectedTeacherSuccess = createAction(
  subjectDetailActions.getSelectedTeacherSuccess,
  props<{ teacher: Teacher }>()
);

export const getStudentsBySelectedSubject = createAction(
  subjectDetailActions.getStudentsBySelectedSubject,
  props<{ teacherId: string, subjectName: string }>()
);

export const getStudentsBySelectedSubjectSuccess = createAction(
  subjectDetailActions.getStudentsBySelectedSubjectSuccess,
  props<{ students: Student[] }>()
);

export const getDates = createAction(
  subjectDetailActions.getDates,
  props<{ subjectName: string }>()
);

export const getTeachersFromOtherSubject = createAction(
  subjectDetailActions.getTeachersFromOtherSubject,
  props<{ teacherListForCurrentSubject: string[] }>()
);

export const getTeachersFromOtherSubjectSuccess = createAction(
  subjectDetailActions.getTeachersFromOtherSubjectSuccess,
  props<{ teachersFromOtherSubjects: Teacher[] }>()
);

export const changeVisibilitySaveButton = createAction(
  subjectDetailActions.changeVisibilitySaveButton,
  props<{ visibility: boolean }>()
);

export const addEmptyDate = createAction(
  subjectDetailActions.addEmptyDate
);

export const changeDate = createAction(
  subjectDetailActions.changeDate,
  props<{ newDate: string, count: number }>()
);

export const changeMark = createAction(
  subjectDetailActions.changeMark,
  props<{
    markValue: number,
    date: string,
    studentId: string,
  }>()
);

export const saveChanges = createAction(
  subjectDetailActions.saveChanges,
  props<{ subjectName: string, teacherId: string, newTeacherId: string }>()
);

export const deleteEmptyMarks = createAction(
  subjectDetailActions.deleteEmptyMarks
);

export const updateTeacherInStudents = createAction(
  subjectDetailActions.updateTeacherInStudents,
  props<{ newTeacherId: string }>()
);

export const updateInfoInDatabase = createAction(
  subjectDetailActions.updateInfoInDatabase,
  props<{ subjectName: string, teacherId: string, newTeacherId: string }>()
);

export const updateTeacherListInSubject = createAction(
  subjectDetailActions.updateTeacherListInSubject,
  props<{ teacherId: string, newTeacherId: string }>()
);

export const updateTeachersFromOtherSubject = createAction(
  subjectDetailActions.updateTeachersFromOtherSubject
);

export const reset = createAction(
  subjectDetailActions.reset
);

export const updateDataSaved = createAction(
  subjectDetailActions.updateDataSaved,
  props<{ save: boolean }>()
);
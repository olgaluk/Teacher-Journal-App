import { createAction, props } from '@ngrx/store';

import { Teacher } from '../../../../common/entities/teacher';

export enum ESubjectTeachersActions {
  GetTeacherListBySubject = '[SubjectTeachers] Get teacher list by subject',
  GetTeacherListBySubjectSuccess = '[SubjectTeachers] Get teacher list by subject success',
  Reset = '[SubjectTeachers] Reset teacher list by subject'
}

export const getTeacherListbySubject = createAction(
  ESubjectTeachersActions.GetTeacherListBySubject,
  props<{ subjectName: string }>()
);

export const getTeacherListbySubjectSuccess = createAction(
  ESubjectTeachersActions.GetTeacherListBySubjectSuccess,
  props<{ teachersBySubject: Teacher[] }>()
);

export const reset = createAction(
  ESubjectTeachersActions.Reset
);
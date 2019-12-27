import { createAction, props } from '@ngrx/store';

import { Teacher } from '../../../../common/entities/teacher';

interface ITypeActions {
  getTeacherListBySubject: string;
  getTeacherListBySubjectSuccess: string;
  reset: string;
}

const BLOCK = '[SubjectTeachers]';

const subjectTeachersActions: ITypeActions = {
  getTeacherListBySubject: `${BLOCK} Get teacher list by subject`,
  getTeacherListBySubjectSuccess: `${BLOCK} Get teacher list by subject success`,
  reset: `${BLOCK} Reset teacher list by subject`,
}

export const getTeacherListbySubject = createAction(
  subjectTeachersActions.getTeacherListBySubject,
  props<{ subjectName: string }>()
);

export const getTeacherListbySubjectSuccess = createAction(
  subjectTeachersActions.getTeacherListBySubjectSuccess,
  props<{ teachersBySubject: Teacher[] }>()
);

export const reset = createAction(
  subjectTeachersActions.reset
);
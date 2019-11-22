import { Action } from '@ngrx/store';

import { Teacher } from '../../../common/entities/teacher';

export enum ETeacherActions {
  GetTeachers = '[Teacher] Get teachers',
  GetTeachersSuccess = '[Teacher] Get teachers success',
  GetTeachersBySubject = '[Teacher] Get teachers by subject',
  GetTeachersBySubjectSuccess = '[Teacher] Get teachers by subject success',
  GetSelectedTeacher = '[Teacher] Get selected teacher',
  GetTeachersFromOtherSubject = '[Teacher] Get teachers from other subjects',
  GetTeachersFromOtherSubjectSuccess = '[Teacher] Get teachers from other subjects success',
  DeleteTeachersBySubject = '[Teacher] Delete teachers by subject'
}

export class GetTeachers implements Action {
  public readonly type = ETeacherActions.GetTeachers;
}

export class GetTeachersSuccess implements Action {
  public readonly type = ETeacherActions.GetTeachersSuccess;
  constructor(public payload: Teacher[]) { }
}

export class GetTeachersBySubject implements Action {
  public readonly type = ETeacherActions.GetTeachersBySubject;
  constructor(public payload: string) { }
}

export class DeleteTeachersBySubject implements Action {
  public readonly type = ETeacherActions.DeleteTeachersBySubject;
}

export class GetTeachersBySubjectSuccess implements Action {
  public readonly type = ETeacherActions.GetTeachersBySubjectSuccess;
  constructor(public payload: Teacher[]) { }
}

export class GetSelectedTeacher implements Action {
  public readonly type = ETeacherActions.GetSelectedTeacher;
  constructor(public payload: string) { }
}

export class GetTeachersFromOtherSubject implements Action {
  public readonly type = ETeacherActions.GetTeachersFromOtherSubject;
  constructor(public payload: string[]) { }
}

export class GetTeachersFromOtherSubjectSuccess implements Action {
  public readonly type = ETeacherActions.GetTeachersFromOtherSubjectSuccess;
  constructor(public payload: Teacher[]) { }
}

export type TeacherActions =
  | GetTeachers
  | GetTeachersSuccess
  | GetTeachersBySubject
  | GetTeachersBySubjectSuccess
  | GetSelectedTeacher
  | GetTeachersFromOtherSubject
  | GetTeachersFromOtherSubjectSuccess
  | DeleteTeachersBySubject;
import { Action } from '@ngrx/store';

import { Teacher } from '../../../common/entities/teacher';

export enum ETeacherActions {
  GetTeachersBySubject = '[Teacher] Get teachers by subject',
  GetTeachersBySubjectSuccess = '[Teacher] Get teachers by subject success',
  SaveSelectedTeacher = '[Teacher] Save selected teacher',
  GetSelectedTeacher = '[Teacher] Get selected teacher'
}

export class GetTeachersBySubject implements Action {
  public readonly type = ETeacherActions.GetTeachersBySubject;
  constructor(public payload: string[]) { }
}

export class GetTeachersBySubjectSuccess implements Action {
  public readonly type = ETeacherActions.GetTeachersBySubjectSuccess;
  constructor(public payload: Teacher[]) { }
}

export class SaveSelectedTeacher implements Action {
  public readonly type = ETeacherActions.SaveSelectedTeacher;
  constructor(public payload: Teacher) { }
}

export type TeacherActions =
  | GetTeachersBySubject
  | GetTeachersBySubjectSuccess
  | SaveSelectedTeacher;
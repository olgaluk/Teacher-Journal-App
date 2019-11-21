import { Action } from '@ngrx/store';

import { Subject } from '../../../common/entities/subject';

export enum ESubjectActions {
  GetSubjects = '[Subject] Get subjects',
  GetSubjectsSuccess = '[Subject] Get subjects success',
  SaveSelectedSubject = '[Subject] Save selected subject'
}

export class GetSubjects implements Action {
  public readonly type = ESubjectActions.GetSubjects;
}

export class GetSubjectsSuccess implements Action {
  public readonly type = ESubjectActions.GetSubjectsSuccess;
  constructor(public payload: Subject[]) { }
}

export class SaveSelectedSubject implements Action {
  public readonly type = ESubjectActions.SaveSelectedSubject;
  constructor(public payload: Subject) { }
}

export type SubjectActions =
  | GetSubjects
  | GetSubjectsSuccess
  | SaveSelectedSubject;
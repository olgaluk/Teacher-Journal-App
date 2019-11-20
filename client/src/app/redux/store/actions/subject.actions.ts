import { Action } from '@ngrx/store';

import { Subject } from '../../../common/entities/subject';

export enum ESubjectActions {
  GetSubjects = '[Subject] Get Subjects',
  GetSubjectsSuccess = '[Subject] Get Subjects Success'
}

export class GetSubjects implements Action {
  public readonly type = ESubjectActions.GetSubjects;
}

export class GetSubjectsSuccess implements Action {
  public readonly type = ESubjectActions.GetSubjectsSuccess;
  constructor(public payload: Subject[]) { }
}

export type SubjectActions = GetSubjects | GetSubjectsSuccess;
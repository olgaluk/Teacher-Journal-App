import { Action } from '@ngrx/store';

import { Subject } from '../../../common/entities/subject';

export interface INewSubjectInfo {
  _id: string,
  teacherId: string,
  newTeacherId: string
}

export enum ESubjectActions {
  GetSubjects = '[Subject] Get subjects',
  GetSubjectsSuccess = '[Subject] Get subjects success',
  GetSelectedSubject = '[Subject] Get selected subject',
  GetSelectedSubjectSuccess = '[Subject] Get selected subject success',
  AddNewSubject = '[Subject] Add new subject',
  AddNewSubjectSuccess = '[Subject] Add new subject success',
  UpdateSubjectTeachersId = '[Subject] Update subject teachers id',
  UpdateSubjectTeachersIdSuccess = '[Subject] Update subject teachers id success'
}

export class GetSubjects implements Action {
  public readonly type = ESubjectActions.GetSubjects;
}

export class GetSubjectsSuccess implements Action {
  public readonly type = ESubjectActions.GetSubjectsSuccess;
  constructor(public payload: Subject[]) { }
}

export class GetSelectedSubject implements Action {
  public readonly type = ESubjectActions.GetSelectedSubject;
  constructor(public payload: string) { }
}

export class GetSelectedSubjectSuccess implements Action {
  public readonly type = ESubjectActions.GetSelectedSubjectSuccess;
  constructor(public payload: Subject) { }
}

export class AddNewSubject implements Action {
  public readonly type = ESubjectActions.AddNewSubject;
  constructor(public payload: Subject) { }
}

export class AddNewSubjectSuccess implements Action {
  public readonly type = ESubjectActions.AddNewSubjectSuccess;
  constructor(public payload: Subject) { }
}

export class UpdateSubjectTeachersId implements Action {
  public readonly type = ESubjectActions.UpdateSubjectTeachersId;
  constructor(public payload: INewSubjectInfo) { }
}

export class UpdateSubjectTeachersIdSuccess implements Action {
  public readonly type = ESubjectActions.UpdateSubjectTeachersIdSuccess;
  constructor(public payload: Subject) { }
}

export type SubjectActions =
  | GetSubjects
  | GetSubjectsSuccess
  | GetSelectedSubject
  | GetSelectedSubjectSuccess
  | AddNewSubject
  | AddNewSubjectSuccess
  | UpdateSubjectTeachersId
  | UpdateSubjectTeachersIdSuccess;

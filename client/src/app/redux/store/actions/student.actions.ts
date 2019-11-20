import { Action } from '@ngrx/store';

import { Student } from '../../../common/entities/student';

export enum EStudentActions {
  GetStudents = '[Student] Get Students',
  GetStudentsSuccess = '[Student] Get Students Success'
}

export class GetStudents implements Action {
  public readonly type = EStudentActions.GetStudents;
}

export class GetStudentsSuccess implements Action {
  public readonly type = EStudentActions.GetStudentsSuccess;
  constructor(public payload: Student[]) { }
}

export type StudentActions = GetStudents | GetStudentsSuccess;
import { Action } from '@ngrx/store';

import { Student } from '../../../common/entities/student';

export interface ISubjectAndTeacherId {
  teacherId: string;
  subjectId: string;
}

export enum EStudentActions {
  GetStudents = '[Student] Get students',
  GetStudentsSuccess = '[Student] Get students success',
  GetStudentsByName = '[Student] Get students by name or last name',
  GetStudentsByNameSuccess = '[Student] Get students by name or last name success',
  GetStudentsBySelectedSubject = '[Student] Get students by selected subject and teacher',
  GetStudentsBySelectedSubjectSuccess = '[Student] Get students by selected subject success'
}

export class GetStudents implements Action {
  public readonly type = EStudentActions.GetStudents;
}

export class GetStudentsSuccess implements Action {
  public readonly type = EStudentActions.GetStudentsSuccess;
  constructor(public payload: Student[]) { }
}

export class GetStudentsByName implements Action {
  public readonly type = EStudentActions.GetStudentsByName;
  constructor(public payload: string) { }
}

export class GetStudentsByNameSuccess implements Action {
  public readonly type = EStudentActions.GetStudentsByNameSuccess;
  constructor(public payload: Student[]) { }
}

export class GetStudentsBySelectedSubject implements Action {
  public readonly type = EStudentActions.GetStudentsBySelectedSubject;
  constructor(public payload: ISubjectAndTeacherId) { }
}

export class GetStudentsBySelectedSubjectSuccess implements Action {
  public readonly type = EStudentActions.GetStudentsBySelectedSubjectSuccess;
  constructor(public payload: Student[]) { }
}

export type StudentActions =
  | GetStudents
  | GetStudentsSuccess
  | GetStudentsByName
  | GetStudentsByNameSuccess
  | GetStudentsBySelectedSubject
  | GetStudentsBySelectedSubjectSuccess;
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
  GetStudentsBySelectedSubjectSuccess = '[Student] Get students by selected subject success',
  AddNewStudent = '[Student] Add new student',
  AddNewStudentSuccess = '[Student] Add new student success',
  UpdateStudents = '[Student] Update students',
  UpdateStudentsSuccess = '[Student] Update students success'
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

export class AddNewStudent implements Action {
  public readonly type = EStudentActions.AddNewStudent;
  constructor(public payload: Student) { }
}

export class AddNewStudentSuccess implements Action {
  public readonly type = EStudentActions.AddNewStudentSuccess;
  constructor(public payload: Student) { }
}

export class UpdateStudents implements Action {
  public readonly type = EStudentActions.UpdateStudents;
  constructor(public payload: Student[]) { }
}

export class UpdateStudentsSuccess implements Action {
  public readonly type = EStudentActions.UpdateStudentsSuccess;
  constructor(public payload: Student[]) { }
}

export type StudentActions =
  | GetStudents
  | GetStudentsSuccess
  | GetStudentsByName
  | GetStudentsByNameSuccess
  | GetStudentsBySelectedSubject
  | GetStudentsBySelectedSubjectSuccess
  | AddNewStudent
  | AddNewStudentSuccess
  | UpdateStudents
  | UpdateStudentsSuccess;
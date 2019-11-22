import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Subject } from '../../entities/subject';

import { INewSubjectInfo } from '../../../redux/store/actions/subject.actions';

@Injectable()
export class HttpSubjectService {
  url: string = 'http://localhost:3004';

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<Subject[]> {
    const url = `${this.url}/subjects`;
    return this.http.get<Subject[]>(url);
  }

  getSubjectByName(subjectName: string): Observable<Subject> {
    const url = `${this.url}/subjects/${subjectName}`;
    return this.http.get<Subject>(url).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }

  addNewSubject(subject: Subject): Observable<Subject> {
    const body = subject;
    const url = `${this.url}/subjects`;
    return this.http.post<Subject>(url, body).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }

  updateSubjectTeachersId(
    subjectInfo: INewSubjectInfo
  ): Observable<Subject> {
    const url = `${this.url}/subjects`;
    const body = subjectInfo;
    return this.http.put<Subject>(url, body).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }
}

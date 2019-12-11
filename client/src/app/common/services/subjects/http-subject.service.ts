import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { serverPath } from '../../constants/serverPath';

import { Subject } from '../../entities/subject';

const formUrlencodedHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
}

const jsonHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
}

@Injectable()
export class HttpSubjectService {
  url: string = serverPath;

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<Subject[]> {
    const url = `${this.url}/subjects`;
    return this.http.get<Subject[]>(url, formUrlencodedHeaders);
  }

  getSubjectByName(subjectName: string): Observable<Subject> {
    const url = `${this.url}/subjects/${subjectName}`;
    return this.http.get<Subject>(url, formUrlencodedHeaders).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }

  addNewSubject(subject: Subject): Observable<Subject> {
    const body = subject;
    const url = `${this.url}/subjects`;
    return this.http.post<Subject>(url, body, jsonHeaders).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }

  updateSubjectTeachersId(
    subjectInfo: any
  ): Observable<Subject> {
    const url = `${this.url}/subjects`;
    const body = subjectInfo;
    return this.http.put<Subject>(url, body, jsonHeaders).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { serverPath } from '../../constants/serverPath';

import { Teacher } from '../../entities/teacher';

const httpHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
}

@Injectable()
export class HttpTeacherService {
  url: string = serverPath;

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<Teacher[]> {
    const url = `${this.url}/teachers`;
    return this.http.get<Teacher[]>(url, httpHeaders).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }

  getTeachersListById(teachersID: string[]): Observable<Teacher[]> {
    const options = {
      ...httpHeaders,
      params: new HttpParams().set('teachersID', JSON.stringify(teachersID))
    };
    const url = `${this.url}/teachers`;
    return this.http.get<Teacher[]>(url, options).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }

  getTeacherById(teacherId: string): Observable<Teacher> {
    const url = `${this.url}/teachers/id/${teacherId}`;
    return this.http.get<Teacher>(url, httpHeaders).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }

  getTeachersFromOtherSubject(teachersIdBySubject: string[]): Observable<Teacher[]> {
    const options = {
      ...httpHeaders,
      params: new HttpParams().set('teachersID', JSON.stringify(teachersIdBySubject))
    };
    const url = `${this.url}/teachers/other`;
    return this.http.get<Teacher[]>(url, options).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Teacher } from '../../entities/teacher';

@Injectable()
export class HttpTeacherService {
  url: string = 'http://localhost:3004';

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<Teacher[]> {
    const url = `${this.url}/teachers`;
    return this.http.get<Teacher[]>(url).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }

  getTeachersListById(teachersID: string[]): Observable<Teacher[]> {
    const options = { params: new HttpParams().set('teachersID', JSON.stringify(teachersID)) };
    const url = `${this.url}/teachers`;
    return this.http.get<Teacher[]>(url, options).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }

  getTeacherById(teacherId: string): Observable<Teacher> {
    const url = `${this.url}/teachers/id/${teacherId}`;
    return this.http.get<Teacher>(url).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }

  getTeachersFromOtherSubject(teachersIdBySubject: string[]): Observable<Teacher[]> {
    const options = { params: new HttpParams().set('teachersID', JSON.stringify(teachersIdBySubject)) };
    const url = `${this.url}/teachers/other`;
    return this.http.get<Teacher[]>(url, options).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }
}

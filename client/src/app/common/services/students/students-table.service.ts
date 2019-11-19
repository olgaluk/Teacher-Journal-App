import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Student } from '../../entities/student';

@Injectable()
export class StudentsTableService {
  url = 'http://localhost:3004';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    const url = `${this.url}/students`;
    return this.http.get<Student[]>(url).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }
      ));
  }

  getStudentsBySubjectAndTeacher(
    teacherId: string,
    subjectId: string
  ): Observable<Student[]> {
    const url = `${this.url}/students/teacher`;
    let params = new HttpParams()
      .set('subjectId', `${subjectId}`)
      .set('teacherId', `${teacherId}`);
    const options = { params: params };
    return this.http.get<Student[]>(url, options).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }

  addNewStudent(
    name: string,
    lastName: string,
    age: number | null,
    address: string
  ): Observable<{}> {
    const body = { name, lastName, age, address, academicPerformance: [] };
    const url = `${this.url}/students`;
    return this.http.post<''>(url, body).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }

  getStudentsByName(studentsName: string): Observable<Student[]> {
    const url = `${this.url}/students/search`;
    let params = new HttpParams()
      .set('studentsName', `${studentsName}`);
    const options = { params: params };
    return this.http.get<Student[]>(url, options).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }
}

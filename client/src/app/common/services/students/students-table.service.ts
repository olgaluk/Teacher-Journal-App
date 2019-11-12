import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Student } from '../../entities/student';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded',
  })
};

@Injectable()
export class StudentsTableService {
  url = 'http://localhost:3004';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    const url = `${this.url}/students`;
    return this.http.get<Student[]>(url, httpOptions);
  }

  getStudentsBySubjectAndTeacher(
    teacherId: number,
    subjectId: number
  ): Observable<Student[]> {
    const url = `${this.url}/students/${subjectId}/${teacherId}`;
    return this.http.get<Student[]>(url);
  }
}

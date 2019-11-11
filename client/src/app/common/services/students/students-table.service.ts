import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Student } from '../../entities/student';

@Injectable()
export class StudentsTableService {
  url = 'http://localhost:3004';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    const url = `${this.url}/students`;
    return this.http.get<Student[]>(url);
  }

  getStudentsBySubjectAndTeacher(
    teacherId: number,
    subjectId: number
  ): Observable<Student[]> {
    const url = `${this.url}/students/${subjectId}/${teacherId}`;
    return this.http.get<Student[]>(url);
  }
}

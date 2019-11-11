import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Subject } from '../../entities/subject';
import { Teacher } from '../../entities/teacher';

@Injectable()
export class SubjectsTableService {
  url = 'http://localhost:3004';

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<Subject[]> {
    const url = `${this.url}/subjects`;
    return this.http.get<Subject[]>(url);
  }

  getSubjectByName(subjectName: string): Observable<Subject> {
    const url = `${this.url}/subjects/${subjectName}`;
    return this.http.get<Subject>(url);
  }

  getTeachersListById(teachersID: number[]): Observable<Teacher[]> {
    const options = { params: new HttpParams().set('teachersID', teachersID.join(',')) };
    const url = `${this.url}/teachers`;
    return this.http.get<Teacher[]>(url, options);
  }

  getTeacherById(teacherId: number): Observable<Teacher> {
    const url = `${this.url}/teacher/${teacherId}`;
    return this.http.get<Teacher>(url);
  }
}

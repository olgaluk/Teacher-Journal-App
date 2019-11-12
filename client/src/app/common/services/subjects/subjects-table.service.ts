import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Subject } from '../../entities/subject';
import { Teacher } from '../../entities/teacher';
import { Student } from '../../entities/student';

@Injectable()
export class SubjectsTableService {
  url: string = 'http://localhost:3004';
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

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

  getTeachersFromOtherSubject(teachersIdBySubject: number[]): Observable<Teacher[]> {
    const options = { params: new HttpParams().set('teachersID', teachersIdBySubject.join(',')) };
    const url = `${this.url}/teachers/other`;
    return this.http.get<Teacher[]>(url, options);
  }

  updateTeachersFromSubject(
    subjectId: number,
    teacherId: number,
    newTeacherId: number
  ): Observable<{}> {
    const url = `${this.url}/subjects`;
    let params = new HttpParams()
      .set('subjectId', `${subjectId}`)
      .set('teacherId', `${teacherId}`)
      .set('newTeacherId', `${newTeacherId}`);
    const options = { params: params };
    return this.http.put(url, options);
  }

  updateStudentsFromSubject(
    students: Student[]
  ): Observable<{}> {
    const url = `${this.url}/students`;
    let params = new HttpParams()
      .set('newStudents', JSON.stringify(students))
    const options = { params: params };
    return this.http.put(url, options);
  }

  saveChanges(
    teacherId: number,
    newTeacherId: number,
    subject: Subject,
    students: Student[]) {
    if (teacherId !== newTeacherId) {
      this.updateTeachersFromSubject(subject.id, teacherId, newTeacherId).subscribe();
    }
    this.updateStudentsFromSubject(students).subscribe();
  }
}

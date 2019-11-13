import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Subject } from '../../entities/subject';
import { Teacher } from '../../entities/teacher';
import { Student } from '../../entities/student';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  })
};

const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class SubjectsTableService {
  url: string = 'http://localhost:3004';

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<Subject[]> {
    const url = `${this.url}/subjects`;
    return this.http.get<Subject[]>(url, httpOptions);
  }

  getSubjectByName(subjectName: string): Observable<Subject> {
    const url = `${this.url}/subjects/${subjectName}`;
    return this.http.get<Subject>(url, httpOptions);
  }

  getTeachers(): Observable<Teacher[]> {
    const url = `${this.url}/teachers`;
    return this.http.get<Teacher[]>(url, httpOptions);
  }

  getTeachersListById(teachersID: string[]): Observable<Teacher[]> {
    const options = { params: new HttpParams().set('teachersID', JSON.stringify(teachersID)) };
    const url = `${this.url}/teachers`;
    return this.http.get<Teacher[]>(url, options);
  }

  getTeacherById(teacherId: string): Observable<Teacher> {
    const url = `${this.url}/teachers/id/${teacherId}`;
    return this.http.get<Teacher>(url, httpOptions);
  }

  getTeachersFromOtherSubject(teachersIdBySubject: string[]): Observable<Teacher[]> {
    const options = { params: new HttpParams().set('teachersID', JSON.stringify(teachersIdBySubject)) };
    const url = `${this.url}/teachers/other`;
    return this.http.get<Teacher[]>(url, options);
  }

  addNewSubject(
    subjectName: string,
    cabinet: number,
    newTeachersID: string[],
    newDescription: string
  ): Observable<{}> {
    const body = { name: subjectName, cabinet: cabinet, teachersID: newTeachersID, description: newDescription };
    const url = `${this.url}/subjects`;
    return this.http.post<''>(url, body, options);
  }

  updateTeachersFromSubject(
    subjectId: string,
    teacherId: string,
    newTeacherId: string
  ): Observable<{}> {
    const url = `${this.url}/subjects`;
    let params = new HttpParams()
      .set('subjectId', `${subjectId}`)
      .set('teacherId', `${teacherId}`)
      .set('newTeacherId', `${newTeacherId}`);
    const options = { headers: httpOptions.headers, params: params };
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
    teacherId: string,
    newTeacherId: string,
    subject: Subject,
    students: Student[]) {
    if (teacherId !== newTeacherId) {
      this.updateTeachersFromSubject(subject._id, teacherId, newTeacherId).subscribe();
    }
    this.updateStudentsFromSubject(students).subscribe();
  }
}

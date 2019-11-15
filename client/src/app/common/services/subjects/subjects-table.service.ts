import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Subject } from '../../entities/subject';
import { Teacher } from '../../entities/teacher';
import { Student } from '../../entities/student';

@Injectable()
export class SubjectsTableService {
  url: string = 'http://localhost:3004';

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<Subject[]> {
    const url = `${this.url}/subjects`;
    return this.http.get<Subject[]>(url);
  }

  getSubjectByName(subjectName: string): Observable<Subject> {
    const url = `${this.url}/subjects/${subjectName}`;
    return this.http.get<Subject>(url);
  }

  getTeachers(): Observable<Teacher[]> {
    const url = `${this.url}/teachers`;
    return this.http.get<Teacher[]>(url);
  }

  getTeachersListById(teachersID: string[]): Observable<Teacher[]> {
    const options = { params: new HttpParams().set('teachersID', JSON.stringify(teachersID)) };
    const url = `${this.url}/teachers`;
    return this.http.get<Teacher[]>(url, options);
  }

  getTeacherById(teacherId: string): Observable<Teacher> {
    const url = `${this.url}/teachers/id/${teacherId}`;
    return this.http.get<Teacher>(url);
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
    return this.http.post<''>(url, body);
  }

  updateTeachersFromSubject(
    subjectId: string,
    teacherId: string,
    newTeacherId: string
  ): Observable<{}> {
    const url = `${this.url}/subjects`;
    const body = { _id: subjectId, teacherId, newTeacherId };
    return this.http.put(url, body);
  }

  updateStudentsFromSubject(
    students: Student[]
  ): Observable<{}> {
    const url = `${this.url}/students`;
    const body = { students: JSON.stringify(students) };
    return this.http.put(url, body);
  }

  saveChanges(
    teacherId: string,
    newTeacherId: string,
    subject: Subject,
    students: Student[]): Observable<{}> {
    if (teacherId !== newTeacherId) {
      this.updateTeachersFromSubject(subject._id, teacherId, newTeacherId)
        .subscribe();
    }
    return this.updateStudentsFromSubject(students);
  }
}

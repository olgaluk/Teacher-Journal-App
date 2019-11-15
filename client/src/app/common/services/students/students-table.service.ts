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
    teacherId: string,
    subjectId: string
  ): Observable<Student[]> {
    const url = `${this.url}/students/teacher`;
    let params = new HttpParams()
      .set('subjectId', `${subjectId}`)
      .set('teacherId', `${teacherId}`);
    const options = { params: params };
    return this.http.get<Student[]>(url, options);
  }

  addNewStudent(
    name: string,
    lastName: string,
    age: number | null,
    address: string
  ): Observable<{}> {
    const body = { name, lastName, age, address, academicPerformance: [] };
    const url = `${this.url}/students`;
    return this.http.post<''>(url, body);
  }

  getStudentsByName(studentsName: string): Observable<Student[]> {
    const url = `${this.url}/students/search`;
    let params = new HttpParams()
      .set('studentsName', `${studentsName}`);
    const options = { params: params };
    return this.http.get<Student[]>(url, options);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { HttpService } from '../../entities/httpService';
import { Student } from '../../entities/student';
import { paths } from '../../constants/paths';

@Injectable()
export class HttpStudentService extends HttpService<Student> {
  constructor(public http: HttpClient) {
    super(paths.studentsTable, http);
  }

  getStudentsBySubjectAndTeacher(
    teacherId: string,
    subjectId: string
  ): Observable<Student[]> {
    const url = `${this.serverPath}/${paths.studentsTable}/teacher`;
    let params = new HttpParams()
      .set('subjectId', `${subjectId}`)
      .set('teacherId', `${teacherId}`);
    const options = { ...this.formUrlencodedHeaders, params: params };
    return this.getItemList(url, options);
  }

  updateStudents(
    students: Student[]
  ): Observable<{}> {
    const url = `${this.serverPath}/${paths.studentsTable}`;
    const body = { students: JSON.stringify(students) };
    return this.updateItems(url, body);
  }
}

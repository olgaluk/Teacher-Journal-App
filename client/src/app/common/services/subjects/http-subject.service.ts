import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { HttpService } from '../../entities/httpService';
import { Subject } from '../../entities/subject';
import { paths } from '../../constants/paths';

@Injectable()
export class HttpSubjectService extends HttpService<Subject> {
  constructor(public http: HttpClient) {
    super(paths.subjectsTable, http);
  }

  updateSubjectTeachersId(
    subjectInfo: any
  ): Observable<{}> {
    const url = `${this.serverPath}/${paths.subjectsTable}`;
    const body = subjectInfo;
    return this.updateItem(url, body);
  }
}

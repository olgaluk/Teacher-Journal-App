import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { HttpService } from '../../entities/httpService';
import { Teacher } from '../../entities/teacher';
import { paths } from '../../constants/paths';

@Injectable()
export class HttpTeacherService extends HttpService<Teacher> {
  constructor(public http: HttpClient) {
    super(paths.teachersTable, http);
  }

  getTeachersFromOtherSubject(teachersIdBySubject: string[]): Observable<Teacher[]> {
    const options = {
      ...this.formUrlencodedHeaders,
      params: new HttpParams().set('teachersID', JSON.stringify(teachersIdBySubject))
    };
    const url = `${this.serverPath}/${paths.teachersTable}/other`;
    return this.getItemList(url, options);
  }
}

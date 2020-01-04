import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  IHttpHeaders,
  formUrlencodedHeaders,
  jsonHeaders,
} from '../../constants/httpHeaders';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { paths } from '../../constants/paths';
import { serverPath } from '../../constants/serverPath';

@Injectable()
export class DropdownService {
  serverPath: string = serverPath;
  formUrlencodedHeaders: IHttpHeaders = formUrlencodedHeaders;
  jsonHeaders: IHttpHeaders = jsonHeaders;

  constructor(public http: HttpClient) { }

  public getSubjectList(): Observable<{}> {
    const url = `${this.serverPath}/${paths.subjectsTable}/list`;
    return this.http.get(url, formUrlencodedHeaders).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }
}

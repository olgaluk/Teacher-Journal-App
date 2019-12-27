import { HttpHeaders } from '@angular/common/http';

export interface IHttpHeaders {
  headers: HttpHeaders;
}

export const formUrlencodedHeaders: IHttpHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
}

export const jsonHeaders: IHttpHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
}
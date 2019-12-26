import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { serverPath } from '../constants/serverPath';

import {
  IHttpHeaders,
  formUrlencodedHeaders,
  jsonHeaders
} from '../constants/httpHeaders';

export abstract class HttpService<T> {
  serverPath: string = serverPath;
  formUrlencodedHeaders: IHttpHeaders = formUrlencodedHeaders;
  jsonHeaders: IHttpHeaders = jsonHeaders;

  constructor(public path: string, public http: HttpClient) { }

  protected getItem(url: string): Observable<T> {
    return this.http.get<T>(url, formUrlencodedHeaders).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }

  protected getItemList(
    url: string,
    options: IHttpHeaders
  ): Observable<T[]> {
    return this.http.get<T[]>(url, options).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }

  protected updateItem(url: string, body: any): Observable<{}> {
    return this.http.put<T>(url, body, this.jsonHeaders).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }

  protected updateItems(url: string, body: any): Observable<{}> {
    return this.http.put<T[]>(url, body, this.jsonHeaders).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }

  getItems(): Observable<T[]> {
    const url = `${this.serverPath}/${this.path}`;
    return this.getItemList(url, formUrlencodedHeaders);
  }

  getItemById(itemId: string): Observable<T> {
    const url = `${this.serverPath}/${this.path}/id/${itemId}`;
    return this.getItem(url);
  }

  getItemByName(name: string): Observable<T> {
    const url = `${this.serverPath}/${this.path}/${name}`;
    return this.getItem(url);
  }

  addNewItem(item: T): Observable<T> {
    const body = item;
    const url = `${this.serverPath}/${this.path}`;
    return this.http.post<T>(url, body, jsonHeaders).pipe(
      catchError(err => {
        console.log('message:', err.statusText);
        return throwError(err);
      }));
  }

  getItemListById(itemsID: string[]): Observable<T[]> {
    const options = {
      ...formUrlencodedHeaders,
      params: new HttpParams().set('idList', JSON.stringify(itemsID))
    };
    const url = `${this.serverPath}/${this.path}`;
    return this.getItemList(url, options);
  }

  getItemListByName(name: string): Observable<T[]> {
    const url = `${this.serverPath}/${this.path}/search`;
    let params = new HttpParams()
      .set('name', `${name}`);
    const options = { ...formUrlencodedHeaders, params: params };
    return this.getItemList(url, options);
  }
}
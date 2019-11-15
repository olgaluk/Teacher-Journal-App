import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const method = request.method;
    const methodCondition = (method === 'PUT' || method === 'POST');
    if (!methodCondition) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(request);
  }
}
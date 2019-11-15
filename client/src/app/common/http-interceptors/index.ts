import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderInterceptor } from './header-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
];
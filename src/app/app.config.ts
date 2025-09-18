import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors} from '@angular/common/http';
import {tap} from 'rxjs';

function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  console.log('[Outgoing Request]');
  console.log(req);

  const request = req.clone({
    headers: req.headers.set('X-DEBUG', 'TESTING')
  })

  return next(request).pipe(
    tap({
      next: event => {
        if (event.type === HttpEventType.Response) {
          console.log('[Incoming Response]');
          console.log(event.status);
          console.log(event.body);
        }
      }
    }));
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([loggingInterceptor])
    )
  ]
};

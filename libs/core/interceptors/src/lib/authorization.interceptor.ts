import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';

import { AuthFacade } from '@bunch/auth/state';
import { EnvironmentService } from '@bunch/core/environments';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private readonly authFacade: AuthFacade, private readonly environmentService: EnvironmentService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authFacade.token$.pipe(
      take(1),
      switchMap((token) => {
        if (token && request.url.startsWith(this.environmentService.getEnvironments().apiHost)) {
          request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
        }

        return next.handle(request);
      })
    );
  }
}

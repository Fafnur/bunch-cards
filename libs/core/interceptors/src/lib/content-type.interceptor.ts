import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ContentTypeInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.headers.has('Content-Type') && request.headers.get('enctype') !== 'multipart/form-data') {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    return next.handle(request);
  }
}

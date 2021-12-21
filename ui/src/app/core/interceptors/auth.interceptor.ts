import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/core/services/site-layout/common.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _commonService: CommonService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const userToken = sessionStorage.getItem('userToken');
    const csrfToken = this._commonService.GetCSRFToken('csrftoken');
    if (userToken) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json',
          Authorization:
            'Token ' + JSON.parse(userToken || JSON.stringify({})).key,
        },
      });
    }
    if (csrfToken) {
      request = request.clone({
        setHeaders: {
          'X-CSRFToken': csrfToken,
        },
      });
    }
    return next.handle(request);
  }
}

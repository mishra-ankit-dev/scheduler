import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.error.detail) {
            alert(err.error.detail || 'Server Error');
          } else if (
            typeof err.error === 'string' &&
            !err.error.includes('<!DOCTYPE')
          ) {
            alert(err.error || 'Server Error');
          } else {
            alert(err.statusText || 'Server Error');
          }
          if (err.status === 401) {
            this._router.navigate(['/']);
          }
        } else {
          alert(err.error || 'Server Error');
        }
        console.error(err);
        return throwError(err.error || 'Server Error');
      })
    );
  }
}

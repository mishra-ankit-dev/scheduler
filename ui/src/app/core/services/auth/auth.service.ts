import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  AUTH_URL: string = 'backend/authentication/';

  constructor(private _http: HttpClient) {}

  Register(userData: IUser): Observable<IToken> {
    return this._http
      .post<IToken>(this.AUTH_URL + 'register/', userData)
      .pipe(share());
  }

  EditUserDetails(userData: any): Observable<IToken> {
    return this._http
      .patch<IToken>(this.AUTH_URL + 'register/', userData)
      .pipe(share());
  }

  LogIn(loginData: any): Observable<IToken> {
    return this._http
      .post<IToken>(this.AUTH_URL + 'login/', loginData)
      .pipe(share());
  }

  ValidateUserInDomain() {
    return this._http
      .post<IToken>(this.AUTH_URL + 'validate/', {})
      .pipe(share(), retry(2));
  }

  LogOut(): Observable<boolean> {
    return this._http
      .post<boolean>(this.AUTH_URL + 'logout/', '')
      .pipe(share());
  }
}

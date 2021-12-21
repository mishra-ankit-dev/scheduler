import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, share, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/auth/user.service';
import { CommonService } from 'src/app/core/services/site-layout/common.service';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss'],
})
export class HomeNavbarComponent implements OnInit {
  @Input('titleColored') titleColored!: string;
  @Input('titleUnColored') titleUnColored!: string;

  loggedInUser$!: Observable<IUser>;
  userProfile$!: Observable<IProfile>;

  constructor(
    private _userService: UserService,

    private _commonService: CommonService,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUser$ = this._userService.getLoggedInUser$();
    this.userProfile$ = this.loggedInUser$.pipe(
      switchMap((loggedInUser) =>
        loggedInUser.id === undefined
          ? this._auth.ValidateUserInDomain().pipe(
              tap((token) => {
                sessionStorage.setItem('userToken', JSON.stringify(token));
                this._userService.setLoggedInUser$(token.user);
                this._router.navigate(['/']);
              }),
              catchError((err) => {
                if (err?.detail.includes('Kindly register')) {
                  return this._router.navigate(['/auth/register']);
                } else {
                  return this._router.navigate(['/auth/login']);
                }
              }),
              map(() => loggedInUser)
            )
          : of(loggedInUser)
      ),
      filter((loggedInUser: IUser) => loggedInUser.id !== undefined),
      switchMap((loggedInUser: IUser) =>
        this._userService.GetUserProfileById(loggedInUser.id)
      ),
      share()
    );
  }
}

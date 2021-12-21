import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/auth/user.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-auth-navbar',
  templateUrl: './auth-navbar.component.html',
  styleUrls: ['./auth-navbar.component.scss'],
})
export class AuthNavbarComponent implements OnInit {
  loggedInUser!: IUser;
  loggedInUser$!: Observable<IUser>;
  userProfile$!: Observable<IProfile>;
  loggedInUserChange$ = new Subject<IUser>();

  @Input('titleColored') titleColored!: string;
  @Input('titleUnColored') titleUnColored!: string;

  constructor(
    private _auth: AuthService,
    private _userService: UserService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn();
    this.loggedInUser$ = this._userService.getLoggedInUser$();
    this.userProfile$ = this._userService.getUserProfile$();
  }

  isLoggedIn() {
    if (sessionStorage.length > 0) {
      this.loggedInUser = this._userService.loggedInUser;

      // this.userProfile$ = this._userService.getUserProfile$();
      return true;
    }
    return false;
  }

  deactivateUser() {
    let deactivateFormData = {
      id: this.loggedInUser.id,
      is_active: false,
    };
    this._route.navigate(['logout']);
    this._auth.EditUserDetails(deactivateFormData).subscribe(
      (deactivateUserResponse) => {
        sessionStorage.clear();
        console.log(deactivateUserResponse);
      },

      (deactivateUserError) => {
        console.log(deactivateUserError);
        alert(deactivateUserError.error);
      },

      () => {
        console.log('Deactivation service called Successfully');
      }
    );
  }

  ngOnDestroy() {
    // this.subscriptions.unsubscribe();
  }
}

import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import {
  isValid,
  isInValid,
  patternValidator,
} from 'src/app/core/validators/custom.validator';
import { UserService } from 'src/app/core/services/auth/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  isValid = isValid;
  isInValid = isInValid;
  loggedInUser: IUser = this._userService.loggedInUser;

  changePasswordForm = new FormBuilder().group({
    id: [this.loggedInUser.id],
    oldPassword: ['', [Validators.required]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}'
        ),
        patternValidator(/\d/, { hasNumber: true }),
        patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        patternValidator(/[a-z]/, { hasSmallCase: true }),
      ],
    ],
  });

  value(controlName: string) {
    return this.changePasswordForm.controls[controlName];
  }

  constructor(
    private _auth: AuthService,
    private _userService: UserService,
    private _route: Router
  ) {}

  ngOnInit(): void {}

  confirmUser() {
    let loginFormData = {
      username: this.loggedInUser.username,
      password: this.value('oldPassword')?.value,
      email: 'amishm7@gmail.com',
    };
    this._auth.LogIn(loginFormData).subscribe(
      (logInResponse) => {
        console.log(logInResponse);
        this.changePassword();
      },

      (logInError) => {
        console.log(logInError);
        alert(logInError.error);
      },

      () => {
        console.log('Login() service called Successfully');
      }
    );
  }

  changePassword() {
    this._auth.EditUserDetails(this.changePasswordForm.value).subscribe(
      (editUserDetailsResponse) => {
        console.log(editUserDetailsResponse);
        this._route.navigate(['']);
      },

      (editUserDetailsError) => {
        console.log(editUserDetailsError);
        alert(editUserDetailsError.error);
      },

      () => {
        console.log('Change password service called Successful');
      }
    );
  }

  ngOnDestroy() {
    // this.subscriptions.unsubscribe();
  }
}

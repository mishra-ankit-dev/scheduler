import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

// All Related to Forms
import { AbstractControl, FormGroup } from '@angular/forms';
import { AuthenticationForms } from 'src/app/core/forms/auth/auth.form';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { isValid, isInValid } from 'src/app/core/validators/custom.validator';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/auth/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isValid = isValid;
  isInValid = isInValid;
  subscriptions = Subscription;

  userValidationCompleted: boolean = false;

  signInForm: FormGroup = AuthenticationForms.LoginForm();

  value(controlName: string): AbstractControl {
    return this.signInForm.controls[controlName];
  }

  constructor(
    private _auth: AuthService,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit() {}

  signIn() {
    this._auth.LogIn(this.signInForm.value).subscribe((logInResponse) => {
      sessionStorage.setItem('userToken', JSON.stringify(logInResponse));
      this._changeLoggedInUser(logInResponse.user);
      this._router.navigate(['/']);
    });
  }

  private _changeLoggedInUser(loggedInUser: IUser) {
    this._userService.setLoggedInUser$(loggedInUser);
  }

  ngOnDestroy() {
    // this.subscriptions.unsubscribe();
  }
}

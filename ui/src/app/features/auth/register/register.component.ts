import { Observable, Subscription, timer } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

// All related to Forms
import { FormGroup } from '@angular/forms';
import { AuthenticationForms } from 'src/app/core/forms/auth/auth.form';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { isValid, isInValid } from 'src/app/core/validators/custom.validator';
import { UserService } from 'src/app/core/services/auth/user.service';
import { map, share, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  isValid = isValid;
  isInValid = isInValid;

  allUsers$!: Observable<IUser[]>;

  signUpForm!: FormGroup;
  signUpSubs!: Subscription;

  value(controlName: string) {
    return this.signUpForm.controls[controlName];
  }

  constructor(
    private _auth: AuthService,
    public _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.allUsers$ = timer(0, 5000).pipe(
      switchMap((_) => this._userService.allUsers$),
      tap((allUsers: IUser[]) => {
        if (!this.signUpForm) {
          this.signUpForm = AuthenticationForms.SignUpForm(allUsers);
        }
      }),
      share()
    );
  }

  signUp() {
    this.signUpSubs = this._auth
      .Register(this.signUpForm.value)
      .subscribe((signUpResponse) => {
        alert(
          'Hit the link sent to ' +
            signUpResponse.user.email +
            ' to activate acount'
        );

        this._router.navigate(['/auth']);
      });
  }

  ngOnDestroy() {
    // this.subscriptions.unsubscribe();
    if (this.signUpSubs) {
      this.signUpSubs.unsubscribe();
    }
  }
}

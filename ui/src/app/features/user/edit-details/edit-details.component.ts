import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

// All related to Forms
import { FormGroup } from '@angular/forms';
import { UserDetailsForms } from 'src/app/core/forms/auth/auth.form';
import { UserService } from 'src/app/core/services/auth/user.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { isValid, isInValid } from 'src/app/core/validators/custom.validator';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss'],
})
export class EditDetailsComponent implements OnInit, OnDestroy {
  isValid = isValid;
  isInValid = isInValid;

  isUserConfirmed: boolean = false;

  allUsers$!: Observable<IUser[]>;
  loggedInUser$!: Observable<IUser>;
  userProfile$!: Observable<IProfile>;

  confirmUserForm!: FormGroup;
  editDetailsForm!: FormGroup;

  constructor(
    private _route: Router,
    private _auth: AuthService,
    private _authData: UserService
  ) {}

  value_c(controlName: string) {
    return this.confirmUserForm.controls[controlName];
  }

  value_e(controlName: string) {
    return this.editDetailsForm.controls[controlName];
  }

  ngOnInit(): void {
    this.loggedInUser$ = this._authData.getLoggedInUser$();

    this.userProfile$ = this.loggedInUser$.pipe(
      tap((loggedInUser: IUser) => {
        this._authData.setLoggedInUser$(loggedInUser);
        this.confirmUserForm = UserDetailsForms.ConfirmUserForm(loggedInUser);
      }),
      switchMap((loggedInUser: IUser) =>
        this._authData.GetUserProfileById(loggedInUser.id)
      )
    );

    this.allUsers$ = this.loggedInUser$.pipe(
      switchMap((loggedInUser: IUser) =>
        this._authData.allUsers$.pipe(
          tap((allUsers: IUser[]) => {
            this.editDetailsForm = UserDetailsForms.EditDetailsForm(
              loggedInUser,
              allUsers
            );
            this.editDetailsForm.patchValue(loggedInUser);
          })
        )
      )
    );
  }

  confirmUser(username: string) {
    this.value_c('username').setValue(username);
    this._auth.LogIn(this.confirmUserForm.value).subscribe(
      (logInResponse) => {
        this._authData.setLoggedInUser$(logInResponse.user);
        // this.editDetailsForm.patchValue(logInResponse.user);
        this.isUserConfirmed = true;
      },

      (logInError) => {
        console.log(logInError);
        this.isUserConfirmed = false;
      }
    );
  }

  changeUserDetails() {
    this._auth.EditUserDetails(this.editDetailsForm.value).subscribe(
      (editUserDetailsResponse) => {
        this._route.navigate(['/user']);
      },

      (editUserDetailsError) => {
        console.log(editUserDetailsError);
        alert(editUserDetailsError.error);
      }
    );
  }

  ngOnDestroy() {
    // this.subscriptions.unsubscribe();
  }
}

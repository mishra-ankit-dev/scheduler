import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

// All related to Forms
import { FormGroup } from '@angular/forms';
import { isValid, isInValid } from 'src/app/core/validators/custom.validator';
import { UserService } from 'src/app/core/services/auth/user.service';
import { UserForms } from 'src/app/core/forms/user/user.form';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  isValid = isValid;
  isInValid = isInValid;
  loggedInUser!: IUser;

  editProfileForm!: FormGroup;
  userProfile$!: Observable<IProfile>;

  value(controlName: string) {
    return this.editProfileForm.get(controlName);
  }

  constructor(private _userService: UserService, private _router: Router) {}

  ngOnInit(): void {
    // this.loggedInUser = this._userService.loggedInUser;
    // this.editProfileForm = UserForms.EditProfile(this.loggedInUser);
    // this.setUserProfile();

    this.userProfile$ = this._userService.getLoggedInUser$().pipe(
      switchMap((loggedInUser: IUser) =>
        this._userService.GetUserProfileById(loggedInUser.id)
      ),
      tap((userprofile: IProfile) => {
        this.editProfileForm = UserForms.EditProfile(this.loggedInUser);
        userprofile ? delete userprofile.image : {};
        this.editProfileForm.patchValue(userprofile);
      })
    );
  }

  // setUserProfile() {
  //   this._userService.getUserProfile$().subscribe((profileResponse) => {
  //     console.log(profileResponse);
  //     profileResponse ? delete profileResponse.image : {};
  //     this.editProfileForm.patchValue(profileResponse);
  //   });
  // }

  editProfile() {
    this.editProfileForm.removeControl('image');
    this._userService.EditProfile(this.editProfileForm.value).subscribe(
      (editProfileResponse) => {
        this._userService.setUserProfile$(editProfileResponse);
        this._router.navigate(['']);
      },
      (editProfileError) => {
        console.log(editProfileError);
      }
    );
  }

  ngOnDestroy() {
    // this.subscriptions.unsubscribe();
  }
}

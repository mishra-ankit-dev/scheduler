import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/core/services/auth/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit, OnDestroy {
  userId!: number;
  profileKeys!: string[];

  loggedInUser!: IUser;
  userProfile$!: Observable<IProfile>;

  constructor(
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(
      (params) => (this.userId = params?.id)
    );
    if (this.userId != this.loggedInUser?.id) {
      this._userService
        .GetUserProfileById(this.userId)
        .subscribe((userProfileResponse) => {
          console.log('In View-Profile');
          console.log(userProfileResponse);
          this._userService.setUserProfile$(userProfileResponse);

          this.loggedInUser = this._userService.loggedInUser;
          this.userProfile$ = this._userService.getUserProfile$();
          this.profileKeys = Object.keys(userProfileResponse);
        });
    }
  }

  ngOnDestroy() {
    // this.subscriptions.unsubscribe();
  }
}

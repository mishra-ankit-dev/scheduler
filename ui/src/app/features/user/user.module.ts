import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { Observable, Subscription, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/auth/user.service';
import { CommonService } from 'src/app/core/services/site-layout/common.service';
import { NavigationStart } from '@angular/router';

@NgModule({
  declarations: [
    EditDetailsComponent,
    ChangePasswordComponent,
    EditProfileComponent,
    ViewProfileComponent,
    UserHomeComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, UserRoutingModule],
})
export class UserModule {
  loading!: boolean;
  timerUserDataSubs!: Subscription;
  getUserProfileSubs!: Subscription;
  currentRouteURL$!: Observable<NavigationStart>;

  constructor(
    private _userService: UserService,
    private _commonService: CommonService
  ) {
    this.currentRouteURL$ = this._commonService.currentRouteURL$().pipe(
      tap((currentRoute) => {
        if (currentRoute.url.includes('/user')) {
          this.GetUserData();
        } else {
          if (this.timerUserDataSubs) {
            this.timerUserDataSubs.unsubscribe();
            this.getUserProfileSubs.unsubscribe();
          }
        }
      })
    );
    this.currentRouteURL$.subscribe();
  }

  GetUserData() {
    this.getLoggedInUser();
    this.timerUserDataSubs = timer(0, 200000)
      .pipe(
        tap((_) => {
          if (!this._userService.loggedInUser) {
            this.getLoggedInUser();
          }
          if (this._userService.loggedInUser.id) {
            this.getUserProfileById(this._userService.loggedInUser?.id);
          }
        })
      )
      .subscribe();
  }

  getLoggedInUser() {
    this._userService.getLoggedInUser$().subscribe((loggedInUserResponse) => {
      this._userService.loggedInUser = loggedInUserResponse;
      this._userService.setLoggedInUser$(loggedInUserResponse);
    });
  }

  getUserProfileById(id: number) {
    this.getUserProfileSubs = this._userService
      .GetUserProfileById(id)
      .subscribe((getUserProfileResponse) => {
        this._userService.setUserProfile$(getUserProfileResponse);
      });
  }
}

import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserService } from 'src/app/core/services/auth/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit, OnDestroy {
  loggedInUser!: IUser;

  notification: INotification = <INotification>{};

  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this._userService.loggedInUser;
    this.logout();
  }

  logout() {
    if (this.loggedInUser) {
      this._auth.LogOut().subscribe((_) => {
        sessionStorage.clear();
        this._userService.setLoggedInUser$(<IUser>{});
      });
    } else {
      this._router.navigate(['/auth']);
    }
  }

  ngOnDestroy() {
    // this.subscriptions.unsubscribe();
  }
}

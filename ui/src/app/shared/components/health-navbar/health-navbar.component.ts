import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RouteNames } from 'src/app/core/constants/route.names';

@Component({
  selector: 'app-health-navbar',
  templateUrl: './health-navbar.component.html',
  styleUrls: ['./health-navbar.component.scss'],
})
export class HealthNavbarComponent implements OnInit {
  @Input('titleColored') titleColored!: string;
  @Input('titleUnColored') titleUnColored!: string;

  loggedInUser$!: Observable<IUser>;
  userProfile$!: Observable<IProfile>;

  constructor() {}

  ngOnInit(): void {}

  GetRouteByRouteName(routeName: string) {
    return RouteNames.getRoutePathByName(routeName);
  }
}

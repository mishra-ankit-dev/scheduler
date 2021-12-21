import { Component, Input, OnInit } from '@angular/core';
import { RouteNames } from 'src/app/core/constants/route.names';

@Component({
  selector: 'app-schedule-navbar',
  templateUrl: './schedule-navbar.component.html',
  styleUrls: ['./schedule-navbar.component.scss'],
})
export class ScheduleNavbarComponent implements OnInit {
  @Input('titleColored') titleColored!: string;
  @Input('titleUnColored') titleUnColored!: string;

  constructor() {}

  ngOnInit(): void {}

  GetRouteByRouteName(routeName: string) {
    return RouteNames.getRoutePathByName(routeName);
  }
}

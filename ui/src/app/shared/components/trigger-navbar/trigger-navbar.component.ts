import { Component, Input, OnInit } from '@angular/core';
import { RouteNames } from 'src/app/core/constants/route.names';

@Component({
  selector: 'app-trigger-navbar',
  templateUrl: './trigger-navbar.component.html',
  styleUrls: ['./trigger-navbar.component.scss'],
})
export class TriggerNavbarComponent implements OnInit {
  @Input('titleColored') titleColored!: string;
  @Input('titleUnColored') titleUnColored!: string;

  constructor() {}

  ngOnInit(): void {}

  GetRouteByRouteName(routeName: string) {
    return RouteNames.getRoutePathByName(routeName);
  }
}

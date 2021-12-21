import { Component, Input, OnInit } from '@angular/core';
import { RouteNames } from 'src/app/core/constants/route.names';

@Component({
  selector: 'app-server-navbar',
  templateUrl: './server-navbar.component.html',
  styleUrls: ['./server-navbar.component.scss'],
})
export class ServerNavbarComponent implements OnInit {
  @Input('titleColored') titleColored!: string;
  @Input('titleUnColored') titleUnColored!: string;

  constructor() {}

  ngOnInit(): void {}

  GetRouteByRouteName(routeName: string) {
    return RouteNames.getRoutePathByName(routeName);
  }
}

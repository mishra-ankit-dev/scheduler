import { Component, OnInit } from '@angular/core';
import { RouteNames } from 'src/app/core/constants/route.names';
import { TechnologyDataService } from 'src/app/core/services/technology-data.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss'],
})
export class LeftSidebarComponent implements OnInit {
  ADMIN_URL = `${window.location.origin}/admin/`;
  constructor(private _technologyDataService: TechnologyDataService) {}

  ngOnInit(): void {}

  IsUserLoggedIn(): boolean {
    return sessionStorage.getItem('userToken') ? true : false;
  }

  GetRouteByRouteName(routeName: string) {
    return RouteNames.getRoutePathByName(routeName);
  }

  SetTechnology(technology: string) {
    this._technologyDataService.currentTechnology = technology;
  }
}

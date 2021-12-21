import { Component, OnInit } from '@angular/core';
import { NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/core/services/site-layout/common.service';

@Component({
  selector: 'app-secondary-navbar',
  templateUrl: './secondary-navbar.component.html',
  styleUrls: ['./secondary-navbar.component.scss'],
})
export class SecondaryNavbarComponent implements OnInit {
  currentRouteURL$!: Observable<NavigationStart>;

  constructor(private _commonService: CommonService) {}

  ngOnInit(): void {
    this.currentRouteURL$ = this._commonService.currentRouteURL$();
  }

  routeIsHomeURL(currentRouteURL: string): boolean {
    if (currentRouteURL.startsWith('/') && currentRouteURL.endsWith('/')) {
      this._commonService.placeholder = 'home';
      return true;
    }
    return false;
  }

  routeIsSchedulerURL(currentRouteURL: string): boolean {
    if (currentRouteURL.includes('/schedule')) {
      this._commonService.placeholder = 'Schedule';
      return true;
    }
    return false;
  }

  routeIsTriggerURL(currentRouteURL: string): boolean {
    if (currentRouteURL.includes('/trigger')) {
      this._commonService.placeholder = 'Trigger';
      return true;
    }
    return false;
  }

  routeIsServerURL(currentRouteURL: string): boolean {
    if (currentRouteURL.includes('/server')) {
      this._commonService.placeholder = 'Server';
      return true;
    }
    return false;
  }

  routeIsHealthURL(currentRouteURL: string): boolean {
    if (currentRouteURL.includes('/health')) {
      this._commonService.placeholder = 'Health';
      return true;
    }
    return false;
  }

  routeIsAuthURL(currentRouteURL: string): boolean {
    if (currentRouteURL.startsWith('/auth')) {
      return true;
    }
    return false;
  }

  routeIsUserURL(currentRouteURL: string): boolean {
    if (currentRouteURL.startsWith('/user')) {
      return true;
    }
    return false;
  }
}

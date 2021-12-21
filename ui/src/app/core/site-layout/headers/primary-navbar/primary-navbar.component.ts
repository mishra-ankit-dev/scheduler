import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RouteNames } from 'src/app/core/constants/route.names';
import { CommonService } from 'src/app/core/services/site-layout/common.service';
import { TechnologyDataService } from 'src/app/core/services/technology-data.service';

@Component({
  selector: 'app-primary-navbar',
  templateUrl: './primary-navbar.component.html',
  styleUrls: ['./primary-navbar.component.scss'],
})
export class PrimaryNavbarComponent implements OnInit {
  currentRouteURL!: NavigationEnd;
  currentTechnology$!: Observable<string>;

  constructor(
    private _router: Router,
    private _commonService: CommonService,
    private _technologyDataService: TechnologyDataService
  ) {}

  ngOnInit(): void {
    this._commonService
      .currentRouteURL$()
      .pipe(
        map(
          (currentRouteURL: NavigationEnd) =>
            (this.currentRouteURL = currentRouteURL)
        )
      )
      .subscribe();

    this.currentTechnology$ =
      this._technologyDataService.currentTechnology$.pipe(
        tap((currentTechnology: string) => {
          RouteNames.setRoutePathByTechnology(currentTechnology);
          if (this.currentRouteURL) {
            let splittedPath = this.currentRouteURL?.url.split('/');
            splittedPath[1] = currentTechnology;
            this._router.navigate([splittedPath.join('/')]);
          }
        })
      );
  }
}

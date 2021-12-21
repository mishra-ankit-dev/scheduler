import { Injectable } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  constructor(private _router: Router) {}
  // Data storage for which navigation bar to show
  private _currentRouteURL$: Observable<NavigationEnd> =
    this._router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd),
      map((event: Event) => <NavigationEnd>event)
    );

  get currentRouteURL$(): Observable<NavigationEnd> {
    return this._currentRouteURL$;
  }
}

import { Component, OnInit } from '@angular/core';
import {
  Event,
  Router,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  NavigationCancel,
} from '@angular/router';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  routingIsDelayed: boolean = false;
  routerEvents$ = this._router.events;

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.routerEvents$.subscribe((routerEvent: Event) =>
      this.checkRouterEvent(routerEvent)
    );
  }

  checkRouterEvent(routerEvent: Event) {
    if (routerEvent instanceof NavigationStart) {
      this.routingIsDelayed = true;
    }

    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.routingIsDelayed = false;
    }
  }
}

export class RouteNames {
  private static _routeNamesObject: { [key: string]: string } = {};

  private static _allRoutes: IRoute[] = [
    { name: 'auth', path: '/auth' },
    { name: 'user', path: '/user' },
    { name: 'ae', path: '/ae' },

    { name: 'trigger-home', path: '/tech/trigger' },
    { name: 'trigger-create', path: '/tech/trigger/create' },
    { name: 'trigger-view-all', path: '/tech/trigger/view-all' },

    { name: 'schedule-home', path: '/tech/schedule' },
    { name: 'schedule-view', path: '/tech/schedule/view' },
    { name: 'schedule-create', path: '/tech/schedule/create' },

    { name: 'server-home', path: '/tech/server' },
    { name: 'server-create', path: '/tech/server/create' },
    { name: 'server-view-all', path: '/tech/server/view-all' },

    { name: 'health-home', path: '/health' },
    { name: 'health-monitor', path: '/health/monitor' },
    { name: 'health-details', path: '/health/details' },
  ];

  public static get allRoutes(): IRoute[] {
    return RouteNames._allRoutes;
  }

  public static AddRoutes(routes: IRoute[]) {
    if (routes) {
      routes.forEach((route) => {
        this._routeNamesObject[route.name] = route.path;
      });
    }
  }

  static get routes() {
    return this._routeNamesObject;
  }

  static getRoutePathByName(name: string) {
    return this._routeNamesObject[name] ? this._routeNamesObject[name] : '';
  }

  static setRoutePathByTechnology(technology: string) {
    Object.keys(this._routeNamesObject).forEach((name: string) => {
      if (
        name.includes('server') ||
        name.includes('trigger') ||
        name.includes('schedule')
      ) {
        let path = this._routeNamesObject[name];
        let splittedPath = path.split('/');
        splittedPath[1] = technology;
        this._routeNamesObject[name] = `${splittedPath.join('/')}`;
      }
    });
  }
}

interface IRoute {
  name: string;
  path: string;
}

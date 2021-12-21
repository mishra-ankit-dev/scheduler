import { Pipe, PipeTransform } from '@angular/core';
import { RouteNames } from 'src/app/core/constants/route.names';

@Pipe({
  name: 'routePath',
})
export class RoutePathPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return RouteNames.getRoutePathByName(value);
  }
}

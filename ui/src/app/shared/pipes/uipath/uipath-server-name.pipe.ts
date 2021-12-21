import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uipathServerName',
})
export class UipathServerNamePipe implements PipeTransform {
  transform(server: number | IUiPathServer, ...args: unknown[]): string {
    if (typeof server == 'number') {
      return server.toString();
    }
    return (<IUiPathServer>server).serverName || 'NA';
  }
}

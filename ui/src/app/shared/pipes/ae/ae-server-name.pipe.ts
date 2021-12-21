import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aeServerName',
})
export class AeServerNamePipe implements PipeTransform {
  transform(server: number | IAEServer, ...args: unknown[]): string {
    if (typeof server == 'number') {
      return server.toString();
    }
    return (<IAEServer>server).serverName || 'NA';
  }
}

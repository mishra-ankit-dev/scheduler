import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bpServerName',
})
export class BpServerNamePipe implements PipeTransform {
  transform(server: number | IBPServer, ...args: unknown[]): string {
    if (typeof server == 'number') {
      return server.toString();
    }
    return (<IBPServer>server).serverName || 'NA';
  }
}

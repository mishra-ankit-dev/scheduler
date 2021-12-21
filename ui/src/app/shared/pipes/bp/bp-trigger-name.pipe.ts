import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bpTriggerName',
})
export class BpTriggerNamePipe implements PipeTransform {
  transform(server: number | IBPTrigger, ...args: unknown[]): string {
    if (typeof server == 'number') {
      return server.toString();
    }
    return (<IBPTrigger>server).triggerName || 'NA';
  }
}

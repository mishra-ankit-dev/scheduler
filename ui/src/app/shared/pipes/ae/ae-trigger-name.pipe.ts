import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aeTriggerName',
})
export class AeTriggerNamePipe implements PipeTransform {
  transform(server: number | IAETrigger, ...args: unknown[]): string {
    if (typeof server == 'number') {
      return server.toString();
    }
    return (<IAETrigger>server).triggerName || 'NA';
  }
}

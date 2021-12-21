import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uipathTriggerName',
})
export class UipathTriggerNamePipe implements PipeTransform {
  transform(server: number | IUiPathTrigger, ...args: unknown[]): string {
    if (typeof server == 'number') {
      return server.toString();
    }
    return (<IUiPathTrigger>server).triggerName || 'NA';
  }
}

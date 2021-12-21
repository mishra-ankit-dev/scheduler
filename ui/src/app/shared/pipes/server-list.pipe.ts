import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serverList',
})
export class ServerListPipe implements PipeTransform {
  transform(value: IAEServer[], ...args: unknown[]): IAEServer[] {
    let serverDetailList: IAEServer[] = [];
    value.forEach((serverDetail: IAEServer) => {
      serverDetailList.push(serverDetail);
    });
    return serverDetailList;
  }
}

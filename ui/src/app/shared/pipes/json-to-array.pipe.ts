import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonToArray',
})
export class JsonToArrayPipe implements PipeTransform {
  transform(value: object, ...args: unknown[]): [] {
    //   for (var type in value) {
    //     let item = Object();
    //     item.key = type;
    //     item.value = value[type];
    //     jsonToBeUsed.push(item);
    // }
    return [];
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Observable, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonService } from 'src/app/core/services/site-layout/common.service';

@Pipe({
  name: 'filterBpTriggers',
})
export class FilterBpTriggersPipe implements PipeTransform {
  constructor(private _commonService: CommonService) {}

  transform(allSchedules$: Observable<IBPTrigger[]>): Observable<IBPTrigger[]> {
    this._commonService.searchBoxTypedKeywords = '';
    return combineLatest([
      allSchedules$,
      this._commonService.searchBoxKeywords$,
    ]).pipe(
      map(([schedules, keyword]) => {
        let filteredScheduleList: IBPTrigger[] = [];
        if (keyword == '') {
          filteredScheduleList = schedules;
        } else {
          schedules.forEach((schedule: IBPTrigger) => {
            const scheduleValues = Object.values(schedule);
            for (var index in scheduleValues) {
              const scheduleValue =
                scheduleValues[index] == null ? '' : scheduleValues[index];
              if (
                scheduleValue
                  .toString()
                  .toUpperCase()
                  .includes(keyword.toUpperCase())
              ) {
                filteredScheduleList.push(schedule);
                break;
              }
            }
          });
        }
        return filteredScheduleList;
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { BP } from 'src/app/core/constants/endpoints';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  constructor(private _http: HttpClient) {}

  GetAllSchedules(filter: string): Observable<IBPSchedule[]> {
    filter = filter == 'all' ? '' : `?status=${filter}`;
    return this._http
      .get<IBPSchedule[]>(`${BP.SCHEDULES_URL}${filter}`)
      .pipe(share());
  }

  AddSchedule(scheduleData: IBPSchedule) {
    return this._http
      .post<IBPSchedule>(BP.SCHEDULES_URL, scheduleData)
      .pipe(share());
  }

  DeleteSchedule(scheduleId: number): Observable<IBPSchedule> {
    return this._http
      .delete<IBPSchedule>(BP.SCHEDULES_URL + `${scheduleId}/`)
      .pipe(share());
  }
}

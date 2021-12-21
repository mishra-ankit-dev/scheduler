import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { AE } from 'src/app/core/constants/endpoints';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  constructor(private _http: HttpClient) {}

  GetAllSchedules(filter: string): Observable<IAESchedule[]> {
    filter = filter == 'all' ? '' : `?status=${filter}`;
    return this._http
      .get<IAESchedule[]>(`${AE.SCHEDULES_URL}${filter}`)
      .pipe(share());
  }

  AddSchedule(scheduleData: IAESchedule) {
    return this._http
      .post<IAESchedule>(AE.SCHEDULES_URL, scheduleData)
      .pipe(share());
  }

  DeleteSchedule(scheduleId: number): Observable<IAESchedule> {
    return this._http
      .delete<IAESchedule>(AE.SCHEDULES_URL + `${scheduleId}/`)
      .pipe(share());
  }
}

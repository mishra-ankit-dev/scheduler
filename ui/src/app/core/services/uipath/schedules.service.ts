import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { UiPath } from 'src/app/core/constants/endpoints';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  constructor(private _http: HttpClient) {}

  GetAllSchedules(filter: string): Observable<IUiPathSchedule[]> {
    filter = filter == 'all' ? '' : `?status=${filter}`;
    return this._http
      .get<IUiPathSchedule[]>(`${UiPath.SCHEDULES_URL}${filter}`)
      .pipe(share());
  }

  AddSchedule(scheduleData: any): Observable<IUiPathSchedule> {
    return this._http
      .post<IUiPathSchedule>(UiPath.SCHEDULES_URL, scheduleData)
      .pipe(share());
  }

  DeleteSchedule(scheduleId: number): Observable<IUiPathSchedule> {
    return this._http
      .delete<IUiPathSchedule>(UiPath.SCHEDULES_URL + `${scheduleId}/`)
      .pipe(share());
  }
}

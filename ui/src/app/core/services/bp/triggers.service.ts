import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { BP } from 'src/app/core/constants/endpoints';

@Injectable({
  providedIn: 'root',
})
export class TriggersService {
  constructor(private _http: HttpClient) {}

  TRIGGERS_URL = 'backend/triggers/';

  triggerSubject: BehaviorSubject<IBPTrigger> = new BehaviorSubject<IBPTrigger>(
    {} as IBPTrigger
  );

  get trigger$(): Observable<IBPTrigger> {
    return this.triggerSubject.asObservable();
  }

  set trigger(triggerData: IBPTrigger) {
    this.triggerSubject.next(triggerData);
  }

  GetAllTriggers() {
    return this._http.get<IBPTrigger[]>(BP.TRIGGERS_URL).pipe(share());
  }

  AddTrigger(triggerData: IBPTrigger) {
    return this._http
      .post<IBPTrigger>(BP.TRIGGERS_URL, triggerData)
      .pipe(share());
  }

  UpdateTrigger(id: number, triggerData: any) {
    return this._http
      .put<IBPTrigger>(BP.TRIGGERS_URL + `${id}/`, triggerData)
      .pipe(share());
  }

  DeleteTrigger(triggerId: number) {
    return this._http
      .delete<IBPTrigger>(BP.TRIGGERS_URL + `${triggerId}/`)
      .pipe(share());
  }
}

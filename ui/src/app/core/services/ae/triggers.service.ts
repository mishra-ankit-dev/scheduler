import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { AE } from 'src/app/core/constants/endpoints';

@Injectable({
  providedIn: 'root',
})
export class TriggersService {
  constructor(private _http: HttpClient) {}

  TRIGGERS_URL = 'backend/triggers/';

  triggerSubject: BehaviorSubject<IAETrigger> = new BehaviorSubject<IAETrigger>(
    {} as IAETrigger
  );

  get trigger$(): Observable<IAETrigger> {
    return this.triggerSubject.asObservable();
  }

  set trigger(triggerData: IAETrigger) {
    this.triggerSubject.next(triggerData);
  }

  GetAllTriggers(): Observable<IAETrigger[]> {
    return this._http.get<IAETrigger[]>(AE.TRIGGERS_URL).pipe(share());
  }

  AddTrigger(triggerData: IAETrigger) {
    return this._http
      .post<IAETrigger>(AE.TRIGGERS_URL, triggerData)
      .pipe(share());
  }

  UpdateTrigger(id: number, triggerData: any) {
    return this._http
      .put<IAETrigger>(AE.TRIGGERS_URL + `${id}/`, triggerData)
      .pipe(share());
  }

  DeleteTrigger(triggerId: number) {
    return this._http
      .delete<IAETrigger>(AE.TRIGGERS_URL + `${triggerId}/`)
      .pipe(share());
  }
}

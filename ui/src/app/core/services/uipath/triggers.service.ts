import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { UiPath } from 'src/app/core/constants/endpoints';

@Injectable({
  providedIn: 'root',
})
export class TriggersService {
  constructor(private _http: HttpClient) {}

  TRIGGERS_URL = 'backend/triggers/';

  triggerSubject: BehaviorSubject<IUiPathTrigger> =
    new BehaviorSubject<IUiPathTrigger>({} as IUiPathTrigger);

  get trigger$(): Observable<IUiPathTrigger> {
    return this.triggerSubject.asObservable();
  }

  set trigger(triggerData: IUiPathTrigger) {
    this.triggerSubject.next(triggerData);
  }

  GetAllTriggers() {
    return this._http.get<IUiPathTrigger[]>(UiPath.TRIGGERS_URL).pipe(share());
  }

  AddTrigger(triggerData: IUiPathTrigger) {
    return this._http
      .post<IUiPathTrigger>(UiPath.TRIGGERS_URL, triggerData)
      .pipe(share());
  }

  UpdateTrigger(id: number, triggerData: any) {
    return this._http
      .put<IUiPathTrigger>(UiPath.TRIGGERS_URL + `${id}/`, triggerData)
      .pipe(share());
  }

  DeleteTrigger(triggerId: number) {
    return this._http
      .delete<IUiPathTrigger>(UiPath.TRIGGERS_URL + `${triggerId}/`)
      .pipe(share());
  }
}

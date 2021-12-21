import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, share } from 'rxjs/operators';
import { Health } from '../../constants/endpoints';

@Injectable({
  providedIn: 'root',
})
export class HealthDetailsService {
  constructor(private _http: HttpClient) {}

  GetHealthDetails(server: IAEServer | IBPServer | IUiPathServer) {
    return this._http.post<IHealthDetail>(Health.DETAILS_URL, server).pipe(
      map((healthDetail: any) => healthDetail.details),
      share()
    );
  }
}

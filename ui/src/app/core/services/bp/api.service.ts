import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { catchError, map, share, take } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { BP } from 'src/app/core/constants/endpoints';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private _http: HttpClient) {}

  GetAllDeployedProcesses(
    serverName: string,
    processName: string
  ): Observable<any> {
    console.log('Entered in Services');

    const params = new HttpParams().set('serverName', serverName);

    if (processName) {
      params.set('processName', processName);
    }

    return this._http.get<any>(BP.API_URL, { params }).pipe(
      map(
        (deployedProcessesData: { processes: [string] }) =>
          deployedProcessesData['processes']
      ),
      catchError(this.errorHandler),
      share()
    );
  }

  GetAllDeployedProcessesWithInputParams(
    serverName: string,
    processName: string
  ): Observable<IBPProcessDetail> {
    console.log('Entered in Services');

    const params = new HttpParams()
      .set('serverName', serverName)
      .set('processName', processName);

    return this._http
      .get<IBPProcessDetail>(`${BP.API_URL}processes/`, { params })
      .pipe(
        map(
          (deployedProcessesData: any) => deployedProcessesData['processInfos']
        ),
        map((processInfos: IBPProcessDetail[]) => processInfos[0]),
        share(),
        take(1)
      );
  }

  GetAllTypesToProcessMappings(serverName: string): Observable<IBPPPMapping> {
    const params = new HttpParams().set('serverName', serverName);

    return this._http
      .get<IBPPPMapping>(BP.API_URL + 'mappings/', {
        params,
      })
      .pipe(catchError(this.errorHandler), share());
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.error || 'Server Error');
  }
}

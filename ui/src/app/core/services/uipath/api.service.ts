import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UiPath } from 'src/app/core/constants/endpoints';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private _http: HttpClient) {}

  GetAllProcessDetails(
    serverName: string,
    tenancyName: string
  ): Observable<IUiPathProcessDetail[]> {
    const params = new HttpParams()
      .set('serverName', serverName)
      .set('tenancyName', tenancyName);
    return this._http
      .get<IUiPathProcessDetail[]>(`${UiPath.API_URL}processes/`, { params })
      .pipe(
        map(
          (deployedProcessesData: any) =>
            deployedProcessesData['process-details']
        ),
        share()
      );
  }

  GetProcessDetailsByProcessName(
    serverName: string,
    tenancyName: string,
    processName: string
  ): Observable<IUiPathProcessDetail> {
    const params = new HttpParams()
      .set('processName', processName)
      .set('serverName', serverName)
      .set('tenancyName', tenancyName);
    return this._http
      .get<IUiPathProcessDetail>(`${UiPath.API_URL}processes/`, { params })
      .pipe(
        map(
          (deployedProcessesData: any) =>
            deployedProcessesData['process-details'][0]
        ),
        share()
      );
  }

  // GetAllDeployedProcessesWithInputParams(
  //   dbServerName: string,
  //   dbName: string,
  //   processName: string
  // ): Observable<IAEProcessDetail> {
  //   console.log('Entered in Services');

  //   const params = new HttpParams()
  //     .set('dbName', dbName)
  //     .set('serverName', dbServerName)
  //     .set('processName', processName);

  //   return this._http
  //     .get<IAEProcessDetail>(`${UiPath.API_URL}processes/`, { params })
  //     .pipe(
  //       map(
  //         (deployedProcessesData: any) => deployedProcessesData['processInfos']
  //       ),
  //       map((processInfos: IAEProcessDetail[]) => processInfos[0]),
  //       share(),
  //       take(1)
  //     );
  // }

  // GetAllProfileToProcessMappings(
  //   dbServerName: string,
  //   dbName: string
  // ): Observable<IAEPPMapping> {
  //   const params = new HttpParams()
  //     .set('dbName', dbName)
  //     .set('serverName', dbServerName);

  //   return this._http
  //     .get<IAEPPMapping>(UiPath.API_URL + 'process-profile-mapping/', {
  //       params,
  //     })
  //     .pipe(share());
  // }
}

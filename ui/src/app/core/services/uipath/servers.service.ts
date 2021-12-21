import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { UiPath } from 'src/app/core/constants/endpoints';

@Injectable({
  providedIn: 'root',
})
export class ServersService {
  constructor(private _http: HttpClient) {}

  private _selectedServerSubject: BehaviorSubject<IUiPathServer> =
    new BehaviorSubject<IUiPathServer>({} as IUiPathServer);
  private _selectedServer$ = this._selectedServerSubject.asObservable();

  get selectedServer$(): Observable<IUiPathServer> {
    return this._selectedServer$;
  }

  set selectedServer(triggerData: IUiPathServer) {
    this._selectedServerSubject.next(triggerData);
  }

  // Communication for server modification
  private _modifiedServerSubject: BehaviorSubject<IUiPathServer> =
    new BehaviorSubject<IUiPathServer>({} as IUiPathServer);
  private _modifiedServer$ = this._modifiedServerSubject.asObservable();

  get modifiedServer$(): Observable<IUiPathServer> {
    return this._modifiedServer$;
  }

  set modifiedServer(server: IUiPathServer) {
    this._modifiedServerSubject.next(server);
  }

  GetAllServers$(): Observable<IUiPathServer[]> {
    return this._http.get<IUiPathServer[]>(UiPath.SERVERS_URL).pipe(share());
  }

  GetServerByServerName(serverName: string): Observable<IUiPathServer> {
    return this._http
      .get<IUiPathServer>(UiPath.SERVERS_URL + serverName + '/')
      .pipe(share());
  }

  AddServer(server: IUiPathServer) {
    return this._http
      .post<IUiPathServer>(UiPath.SERVERS_URL, server)
      .pipe(share());
  }

  DeleteServer(serverName: string) {
    return this._http
      .delete<IUiPathServer>(UiPath.SERVERS_URL + `${serverName}/`)
      .pipe(share());
  }

  UpdateServer(server: IUiPathServer) {
    return this._http
      .put<IUiPathServer>(UiPath.SERVERS_URL + `${server.serverName}/`, server)
      .pipe(share());
  }

  StartServer(serverName: string) {
    return this._http
      .post<any>(UiPath.SERVERS_URL + 'start/', { serverName: serverName })
      .pipe(share());
  }
}

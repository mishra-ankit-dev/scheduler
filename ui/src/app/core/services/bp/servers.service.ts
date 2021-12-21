import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { BP } from 'src/app/core/constants/endpoints';

@Injectable({
  providedIn: 'root',
})
export class ServersService {
  constructor(private _http: HttpClient) {}

  private _selectedServerSubject: BehaviorSubject<IBPServer> =
    new BehaviorSubject<IBPServer>({} as IBPServer);
  private _selectedServer$ = this._selectedServerSubject.asObservable();

  get selectedServer$(): Observable<IBPServer> {
    return this._selectedServer$;
  }

  set selectedServer(server: IBPServer) {
    this._selectedServerSubject.next(server);
  }

  // Communication for server modification
  private _modifiedServerSubject: BehaviorSubject<IBPServer> =
    new BehaviorSubject<IBPServer>({} as IBPServer);
  private _modifiedServer$ = this._modifiedServerSubject.asObservable();

  get modifiedServer$(): Observable<IBPServer> {
    return this._modifiedServer$;
  }

  set modifiedServer(server: IBPServer) {
    this._modifiedServerSubject.next(server);
  }

  GetAllServers$(): Observable<IBPServer[]> {
    return this._http.get<IBPServer[]>(BP.SERVERS_URL).pipe(share());
  }

  GetServerByServerName(serverName: string): Observable<IBPServer> {
    return this._http
      .get<IBPServer>(BP.SERVERS_URL + serverName + '/')
      .pipe(share());
  }

  AddServer(server: IBPServer) {
    return this._http.post<IBPServer>(BP.SERVERS_URL, server).pipe(share());
  }

  DeleteServer(serverName: string) {
    return this._http
      .delete<IBPServer>(BP.SERVERS_URL + `${serverName}/`)
      .pipe(share());
  }

  UpdateServer(server: IBPServer) {
    return this._http
      .put<IBPServer>(BP.SERVERS_URL + `${server.serverName}/`, server)
      .pipe(share());
  }

  StartServer(serverName: string) {
    return this._http
      .post<any>(BP.SERVERS_URL + 'start/', { serverName: serverName })
      .pipe(share());
  }
}

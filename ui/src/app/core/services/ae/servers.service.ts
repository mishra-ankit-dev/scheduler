import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { AE } from 'src/app/core/constants/endpoints';

@Injectable({
  providedIn: 'root',
})
export class ServersService {
  constructor(private _http: HttpClient) {}

  private _selectedServerSubject: BehaviorSubject<IAEServer> =
    new BehaviorSubject<IAEServer>({} as IAEServer);
  private _selectedServer$ = this._selectedServerSubject.asObservable();

  get selectedServer$(): Observable<IAEServer> {
    return this._selectedServer$;
  }

  set selectedServer(server: IAEServer) {
    this._selectedServerSubject.next(server);
  }

  GetAllServers$(): Observable<IAEServer[]> {
    return this._http.get<IAEServer[]>(AE.SERVERS_URL).pipe(share());
  }

  GetServerByServerName(serverName: string): Observable<IAEServer> {
    return this._http
      .get<IAEServer>(AE.SERVERS_URL + serverName + '/')
      .pipe(share());
  }

  AddServer(server: IAEServer) {
    return this._http.post<IAEServer>(AE.SERVERS_URL, server).pipe(share());
  }

  DeleteServer(serverName: string) {
    return this._http
      .delete<IAEServer>(AE.SERVERS_URL + `${serverName}/`)
      .pipe(share());
  }

  UpdateServer(server: IAEServer) {
    return this._http
      .put<IAEServer>(AE.SERVERS_URL + `${server.serverName}/`, server)
      .pipe(share());
  }

  StartServer(serverName: string) {
    return this._http
      .post<any>(AE.SERVERS_URL + 'start/', { serverName: serverName })
      .pipe(share());
  }
}

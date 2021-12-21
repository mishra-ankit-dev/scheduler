import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { RouteNames } from 'src/app/core/constants/route.names';
import { CommonService } from 'src/app/core/services/site-layout/common.service';
import { ServersService } from 'src/app/core/services/uipath/servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
})
export class ServerComponent implements OnInit {
  serverStatus: string = '';
  deleteServerSubs!: Subscription;

  @Input('server') server!: IUiPathServer;
  @Input('serverNo') serverNo!: number;

  @Output('deletedOrStatusChangedTrigger')
  deletedOrStatusChangedTrigger: EventEmitter<IUiPathServer> = new EventEmitter<IUiPathServer>();

  constructor(
    private _router: Router,
    private _commonService: CommonService,
    private _serverService: ServersService
  ) {}

  ngOnInit(): void {}

  ViewServer(server: IUiPathServer) {
    this._serverService.selectedServer = server;
    this._router.navigate([
      RouteNames.getRoutePathByName('server-home'),
      server.serverName,
      'view',
    ]);
  }

  EditServer(server: IUiPathServer) {
    this._serverService.selectedServer = server;
    this._router.navigate([
      RouteNames.getRoutePathByName('server-home'),
      server.serverName,
      'edit',
    ]);
  }

  DeleteServer(server: IUiPathServer) {
    if (
      confirm(
        `Do you want to delete the Server with name ${server.serverName} ?\n
This will delete all the entities using this server i.e Triggers, Schedules, Executions, etc.`
      )
    ) {
      this.deleteServerSubs = this._serverService
        .DeleteServer(server.serverName)
        .subscribe(
          (deletedServer: IUiPathServer) => {
            this.deletedOrStatusChangedTrigger.emit(deletedServer);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  StartServer(server: IUiPathServer) {
    if (
      confirm(
        `Do you want to ${
          server.status ? 'stop' : 'start'
        } the Server with name ${server.serverName} ?`
      )
    ) {
      this.serverStatus = 'Changing for ' + server.serverName;
      this.deleteServerSubs = this._serverService
        .StartServer(server.serverName)
        .subscribe(
          (_) => {
            this.serverStatus = 'Changed';
          },
          (err) => {
            console.log(err);
            this.serverStatus = '';
          },
          () => {
            this.deletedOrStatusChangedTrigger.emit(server);
          }
        );
    }
  }

  ngOnDestroy() {
    this._commonService.searchBoxTypedKeywords = '';
    if (this.deleteServerSubs) {
      this.deleteServerSubs.unsubscribe();
    }
  }
}

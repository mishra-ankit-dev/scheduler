import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServersService } from 'src/app/core/services/ae/servers.service';
import { CommonService } from 'src/app/core/services/site-layout/common.service';

@Component({
  selector: 'app-list-server',
  templateUrl: './list-server.component.html',
  styleUrls: ['./list-server.component.scss'],
})
export class ListServerComponent implements OnInit {
  allServers$!: Observable<IAEServer[]>;

  constructor(
    private _commonService: CommonService,
    private _serverService: ServersService
  ) {}

  ngOnInit(): void {
    this.allServers$ = this._serverService.GetAllServers$();
  }

  onTriggerDeleteOrStatusChange(_: IAEServer) {
    this.ngOnInit();
  }

  ngOnDestroy() {
    this._commonService.searchBoxTypedKeywords = '';
  }
}

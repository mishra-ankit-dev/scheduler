import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ServersService as AEServerService } from 'src/app/core/services/ae/servers.service';
import { ServersService as BPServerService } from 'src/app/core/services/bp/servers.service';
import { ServersService as UiPathServerService } from 'src/app/core/services/uipath/servers.service';

@Component({
  selector: 'app-health-details',
  templateUrl: './health-details.component.html',
  styleUrls: ['./health-details.component.scss'],
})
export class HealthDetailsComponent implements OnInit {
  aeServers$!: Observable<IAEServer[]>;
  bpServers$!: Observable<IBPServer[]>;
  uipathServers$!: Observable<IUiPathServer[]>;

  allTechnologyServers$!: Observable<
    [IAEServer[], IBPServer[], IUiPathServer[]]
  >;

  constructor(
    private _aeServerService: AEServerService,
    private _bpServerService: BPServerService,
    private _uipathServerService: UiPathServerService
  ) {}

  ngOnInit(): void {
    this.aeServers$ = this._aeServerService.GetAllServers$();
    this.bpServers$ = this._bpServerService.GetAllServers$();
    this.uipathServers$ = this._uipathServerService.GetAllServers$();

    this.allTechnologyServers$ = combineLatest([
      this.aeServers$,
      this.bpServers$,
      this.uipathServers$,
    ]);

    this.allTechnologyServers$.pipe(tap(console.log));
  }
}

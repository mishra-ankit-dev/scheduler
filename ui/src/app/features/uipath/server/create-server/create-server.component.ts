import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { share, switchMap } from 'rxjs/operators';
import { ServerForm } from 'src/app/core/forms/uipath/server.form';
import { ServersService } from 'src/app/core/services/uipath/servers.service';
import { RouteNames } from 'src/app/core/constants/route.names';

@Component({
  selector: 'app-create-server',
  templateUrl: './create-server.component.html',
  styleUrls: ['./create-server.component.scss'],
})
export class CreateServerComponent implements OnInit, OnDestroy {
  serverForm!: FormGroup;
  serverName$!: Observable<string>;
  serverNameValueChange$!: Observable<string>;

  addServerSubs!: Subscription;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _serverService: ServersService
  ) {}

  ngOnInit(): void {
    this.serverForm = new ServerForm.CreateServer(this._formBuilder).InItForm();

    this.serverNameValueChange$ =
      this.serverForm.controls['serverName'].valueChanges;

    this.serverName$ = this.serverNameValueChange$.pipe(
      share(),
      switchMap((serverName: string) => {
        this.serverForm.patchValue({
          loginUrl: `https://${serverName}.ad.infosys.com/api/account/authenticate`,
          releasesUrl: `https://${serverName}.ad.infosys.com/odata/Releases`,
          startJobUrl: `https://${serverName}.ad.infosys.com/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs`,
          getJobsUrl: `https://${serverName}.ad.infosys.com/odata/Jobs?$top=2&$filter=Key%20eq%20`,
        });
        return of(serverName);
      })
    );
  }

  AddServer() {
    this.addServerSubs = this._serverService
      .AddServer(this.serverForm.value)
      .subscribe(
        (_) => {
          this._router.navigate([
            RouteNames.getRoutePathByName('server-view-all'),
          ]);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  ngOnDestroy() {
    console.log(this.addServerSubs);
    if (this.addServerSubs != undefined) {
      this.addServerSubs.unsubscribe();
    }
  }
}

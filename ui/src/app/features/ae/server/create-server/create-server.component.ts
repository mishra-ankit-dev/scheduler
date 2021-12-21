import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { share, switchMap } from 'rxjs/operators';
import { ServerForm } from 'src/app/core/forms/ae/server.form';
import { ServersService } from 'src/app/core/services/ae/servers.service';
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
          listenerUrl: `http://${serverName}:3031/listener/rpa/api/message`,
          aeSiteUrl: `http://${serverName}:3031/Admin`,
          messagingUrl: `http://${serverName}:3031/messaging`,
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

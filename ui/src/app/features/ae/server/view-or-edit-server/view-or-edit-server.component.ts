import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ServerForm } from 'src/app/core/forms/ae/server.form';
import { ServersService } from 'src/app/core/services/ae/servers.service';
import { RouteNames } from 'src/app/core/constants/route.names';

@Component({
  selector: 'app-view-or-edit-server',
  templateUrl: './view-or-edit-server.component.html',
  styleUrls: ['./view-or-edit-server.component.scss'],
})
export class ViewOrEditServerComponent implements OnInit, OnDestroy {
  serverForm!: FormGroup;
  serverName$!: Observable<string>;
  serverNameValueChange$!: Observable<string>;
  selectedServer$!: Observable<IAEServer>;
  routeParams$!: Observable<Params>;

  deleteServerSubscription!: Subscription;
  addServerSubscription!: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _serverService: ServersService
  ) {}

  ngOnInit(): void {
    this.routeParams$ = this._route.params;

    this.serverForm = new ServerForm.CreateServer(this._formBuilder).InItForm();

    this.selectedServer$ = this._serverService.selectedServer$.pipe(
      tap((selectedServer: IAEServer) => {
        if (selectedServer?.serverName) {
          this.serverForm.patchValue(selectedServer);
        } else {
          this._router.navigate([
            RouteNames.getRoutePathByName('server-view-all'),
          ]);
        }
      })
    );
  }

  UpdateServer() {
    this.deleteServerSubscription = this._serverService
      .UpdateServer(this.serverForm.value)
      .subscribe(
        (deletedServer: IAEServer) => {
          console.log(deletedServer);
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
    if (this.deleteServerSubscription) {
      this.deleteServerSubscription.unsubscribe();
    }
    if (this.addServerSubscription) {
      this.addServerSubscription.unsubscribe();
    }
  }
}

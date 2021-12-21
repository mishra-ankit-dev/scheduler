import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServerForm } from 'src/app/core/forms/bp/server.form';
import { ServersService } from 'src/app/core/services/bp/servers.service';
import { RouteNames } from 'src/app/core/constants/route.names';

@Component({
  selector: 'app-create-server',
  templateUrl: './create-server.component.html',
  styleUrls: ['./create-server.component.scss'],
})
export class CreateServerComponent implements OnInit, OnDestroy {
  serverForm!: FormGroup;

  addServerSubs!: Subscription;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _serverService: ServersService
  ) {}

  ngOnInit(): void {
    this.serverForm = new ServerForm.CreateServer(this._formBuilder).InItForm();
  }

  AddServer() {
    this.addServerSubs = this._serverService
      .AddServer(this.serverForm.value)
      .subscribe((_) => {
        this._router.navigate([
          RouteNames.getRoutePathByName('server-view-all'),
        ]);
      });
  }

  ngOnDestroy() {
    console.log(this.addServerSubs);
    if (this.addServerSubs != undefined) {
      this.addServerSubs.unsubscribe();
    }
  }
}

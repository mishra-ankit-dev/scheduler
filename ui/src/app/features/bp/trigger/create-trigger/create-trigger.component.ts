import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  share,
  map,
  catchError,
  filter,
} from 'rxjs/operators';
import { TriggerForm } from 'src/app/core/forms/bp/trigger.form';
import { APIService } from 'src/app/core/services/bp/api.service';
import { ServersService } from 'src/app/core/services/bp/servers.service';
import { TriggersService } from 'src/app/core/services/bp/triggers.service';
import { RouteNames } from 'src/app/core/constants/route.names';

@Component({
  selector: 'app-create-trigger',
  templateUrl: './create-trigger.component.html',
  styleUrls: ['./create-trigger.component.scss'],
})
export class CreateTriggerComponent implements OnInit, OnDestroy {
  constructor(
    private _router: Router,
    private _apiService: APIService,
    private _formBuilder: FormBuilder,
    private _serversService: ServersService,
    private _triggersService: TriggersService
  ) {}

  createTriggerForm!: FormGroup;
  allServers$!: Observable<IBPServer[]>;

  selectedServerName$!: Observable<string>;
  selectedServer$!: Observable<IBPServer>;
  selectedProcessType$!: Observable<string>;
  allMappings$!: Observable<IBPPPMapping>;
  mappedProcesses$!: Observable<string[]>;
  selectedProcessName$!: Observable<string>;
  processDetails$!: Observable<IBPProcessDetail>;

  addTriggerSubs!: Subscription;

  ngOnInit(): void {
    this.createTriggerForm = new TriggerForm(this._formBuilder).InitForm();

    // Fetch details of all the servers
    this.allServers$ = this._serversService.GetAllServers$();

    // Keep eye of value change of Server Name
    this.selectedServerName$ = (
      this.createTriggerForm.controls['server'] as FormGroup
    ).controls['serverName'].valueChanges;

    this.selectedServer$ = this.selectedServerName$.pipe(
      tap((_) => {
        this.createTriggerForm.patchValue({ processType: '' });
      }),
      debounceTime(500),
      distinctUntilChanged(),
      filter((selectedServerName: string) => selectedServerName !== ''),
      switchMap((selectedServerName: string) =>
        this._serversService.GetServerByServerName(selectedServerName)
      ),
      share()
    );

    this.allMappings$ = this.selectedServer$.pipe(
      tap((selectedServer: IBPServer) => {
        this.deleteAllProcessInputs();
        this.createTriggerForm.controls['server'].patchValue({
          ...selectedServer,
        });
      }),
      switchMap((selectedServer: IBPServer) =>
        this._apiService.GetAllTypesToProcessMappings(selectedServer.serverName)
      ),
      share()
    );

    this.selectedProcessType$ =
      this.createTriggerForm.controls['processType'].valueChanges;

    this.mappedProcesses$ = combineLatest([
      this.selectedProcessType$,
      this.allMappings$,
    ]).pipe(
      tap((_) => {
        this.createTriggerForm.patchValue({ processName: '' });
        this.deleteAllProcessInputs();
      }),
      map(([selectedProcessType, mappings]) => mappings[selectedProcessType]),
      share()
    );

    this.selectedProcessName$ =
      this.createTriggerForm.controls['processName'].valueChanges;

    this.processDetails$ = combineLatest([
      this.selectedServer$,
      this.selectedProcessName$,
    ]).pipe(
      tap((_) => this.deleteAllProcessInputs()),
      switchMap(([selectedServer, selectedProcessName]) =>
        this._apiService.GetAllDeployedProcessesWithInputParams(
          selectedServer.serverName,
          selectedProcessName
        )
      ),
      tap((processInfos: IBPProcessDetail) =>
        processInfos.processInputs.forEach((processInput) =>
          this.addProcessInput(processInput, '')
        )
      ),
      share()
    );
  }

  get formsArr() {
    return this.createTriggerForm.get('processInputs') as FormArray;
  }

  addProcessInput(name: string, value: string) {
    this.formsArr.push(
      new TriggerForm(this._formBuilder).initProcessInputRows(name, value)
    );
  }

  deleteAllProcessInputs() {
    if (this.formsArr.length > 0) {
      while (this.formsArr.length !== 0) {
        this.formsArr.removeAt(0);
      }
    }
  }

  deleteProcessInput(index: number) {
    this.formsArr.removeAt(index);
  }

  AddTrigger() {
    this.addTriggerSubs = this._triggersService
      .AddTrigger(this.createTriggerForm.value)
      .subscribe(
        (_) => {
          this._router.navigate([
            RouteNames.getRoutePathByName('trigger-view-all'),
          ]);
        },
        (err) => {
          console.log(err);
          alert(err.message);
        }
      );
  }

  @HostListener('window:beforeunload')
  ngOnDestroy() {
    if (this.addTriggerSubs) {
      this.addTriggerSubs.unsubscribe();
    }
  }
}

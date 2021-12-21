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
} from 'rxjs/operators';
import { TriggerForm } from 'src/app/core/forms/uipath/trigger.form';
import { APIService } from 'src/app/core/services/uipath/api.service';
import { ServersService } from 'src/app/core/services/uipath/servers.service';
import { TriggersService } from 'src/app/core/services/uipath/triggers.service';
import { RouteNames } from 'src/app/core/constants/route.names';

@Component({
  selector: 'app-create-trigger',
  templateUrl: './create-trigger.component.html',
  styleUrls: ['./create-trigger.component.scss'],
})
export class CreateTriggerComponent implements OnInit, OnDestroy {
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _triggersService: TriggersService,
    private _serversService: ServersService,
    private _apiService: APIService
  ) {}

  createTriggerForm!: FormGroup;
  allServers$!: Observable<IUiPathServer[]>;

  selectedServer$!: Observable<IUiPathServer>;
  selectedTenancy$!: Observable<string>;
  allProcessDetails$!: Observable<IUiPathProcessDetail[]>;
  selectedProcess$!: Observable<string>;
  processDetails$!: Observable<IUiPathProcessDetail>;

  addTriggerSubs!: Subscription;
  processInfoSubs!: Subscription;
  processMappingsSubs!: Subscription;

  isTenancySelected: boolean = false;
  areAllProcessDetailsFetched: boolean = false;

  ngOnInit(): void {
    this.createTriggerForm = new TriggerForm(this._formBuilder).InitForm();

    // Fetch details of all the servers
    this.allServers$ = this._serversService.GetAllServers$();

    // Keep eye of value change of Server Name
    this.selectedServer$ = (
      this.createTriggerForm.controls['server'] as FormGroup
    ).controls['serverName'].valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((selectedServerName: string) => {
        return this._serversService.GetServerByServerName(selectedServerName);
      }),
      tap((selectedServer: IUiPathServer) => {
        this.createTriggerForm.controls['server'].patchValue({
          ...selectedServer,
        });
        console.log(this.createTriggerForm.value);
      }),
      share()
    );

    this.selectedTenancy$ = this.createTriggerForm.controls[
      'tenancyName'
    ].valueChanges.pipe(tap((_) => (this.isTenancySelected = true)));

    this.allProcessDetails$ = combineLatest([
      this.selectedServer$,
      this.selectedTenancy$,
    ]).pipe(
      switchMap(([selectedServer, selectedTenancy]: [IUiPathServer, string]) =>
        this._apiService.GetAllProcessDetails(
          selectedServer.serverName,
          selectedTenancy
        )
      ),
      tap((_) => (this.areAllProcessDetailsFetched = true)),
      share()
    );

    this.selectedProcess$ =
      this.createTriggerForm.controls['processName'].valueChanges;

    this.processDetails$ = combineLatest([
      this.selectedServer$,
      this.selectedProcess$,
    ]).pipe(
      switchMap(([selectedServer, selectedProcess]: [IUiPathServer, string]) =>
        this._apiService.GetProcessDetailsByProcessName(
          selectedServer.serverName,
          'Default',
          selectedProcess
        )
      ),
      tap((processDetails: IUiPathProcessDetail) => {
        this.createTriggerForm.patchValue({
          releaseKey: processDetails.releaseKey,
        });
        processDetails.processInputs.forEach((processInput: string) => {
          this.addProcessInput(processInput, '');
        });
      }),
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

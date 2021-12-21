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
  filter,
  map,
} from 'rxjs/operators';
import { TriggerForm } from 'src/app/core/forms/ae/trigger.form';
import { AEService } from 'src/app/core/services/ae/api.service';
import { ServersService } from 'src/app/core/services/ae/servers.service';
import { TriggersService } from 'src/app/core/services/ae/triggers.service';
import { RouteNames } from 'src/app/core/constants/route.names';

@Component({
  selector: 'app-create-trigger',
  templateUrl: './create-trigger.component.html',
  styleUrls: ['./create-trigger.component.scss'],
})
export class CreateTriggerComponent implements OnInit, OnDestroy {
  constructor(
    private _router: Router,
    private _apiService: AEService,
    private _formBuilder: FormBuilder,
    private _serversService: ServersService,
    private _triggersService: TriggersService
  ) {}

  createTriggerForm!: FormGroup;
  allServers$!: Observable<IAEServer[]>;

  selectedServerName$!: Observable<string>;
  selectedServer$!: Observable<IAEServer>;
  selectedProfileName$!: Observable<string>;
  allMappings$!: Observable<IAEPPMapping>;
  mappedProcesses$!: Observable<string[]>;
  selectedProcessName$!: Observable<string>;
  processDetails$!: Observable<IAEProcessDetail>;

  addTriggerSubs!: Subscription;

  ngOnInit(): void {
    this.createTriggerForm = new TriggerForm(this._formBuilder).InitForm();
    // (this.createTriggerForm.controls['server'] as FormGroup).controls[
    //   'serverName'
    // ].patchValue({
    //   serverName: 'Select a server...',
    // });

    // Fetch details of all the servers
    this.allServers$ = this._serversService.GetAllServers$();

    // Keep eye of value change of Server Name
    this.selectedServerName$ = (
      this.createTriggerForm.controls['server'] as FormGroup
    ).controls['serverName'].valueChanges;

    this.selectedServer$ = this.selectedServerName$.pipe(
      tap((_) => {
        this.createTriggerForm.patchValue({ profileName: '' });
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
      tap((selectedServer: IAEServer) => {
        this.deleteAllProcessInputs();
        this.createTriggerForm.controls['server'].patchValue({
          ...selectedServer,
        });
      }),
      // filter(
      //   (selectedServer: IAEServer) => selectedServer?.serverName !== undefined
      // ),
      switchMap((selectedServer: IAEServer) =>
        this._apiService.GetAllProfileToProcessMappings(
          selectedServer.serverName
        )
      ),
      share()
    );

    this.selectedProfileName$ =
      this.createTriggerForm.controls['profileName'].valueChanges;

    this.mappedProcesses$ = combineLatest([
      this.selectedProfileName$,
      this.allMappings$,
    ]).pipe(
      tap((_) => {
        this.createTriggerForm.patchValue({ processName: '' });
        this.deleteAllProcessInputs();
      }),
      // filter(([selectedProcessType, mappings]) => selectedProcessType !== ''),
      map(([selectedProfile, mappings]) => mappings[selectedProfile]),
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
      tap((processInfos: IAEProcessDetail) =>
        processInfos.processInputs.forEach((processInput) =>
          this.addProcessInput(processInput, '')
        )
      ),
      share()
    );
  }

  // constructor(
  //   private _router: Router,
  //   private _formBuilder: FormBuilder,
  //   private _triggersService: TriggersService,
  //   private _serversService: ServersService,
  //   private _aeService: AEService
  // ) {}

  // createTriggerForm!: FormGroup;
  // allServers$!: Observable<IAEServer[]>;
  // selectedServer$!: Observable<IAEServer>;

  // isServerSelected: boolean = false;
  // isProfileFetched: boolean = false;
  // isProfileSelected: boolean = false;
  // isProcessesFetched: boolean = false;

  // profileToProcessMapping: any;
  // mappedProcesses: string[] = [];
  // selectedServer!: IAEServer;

  // addTriggerSubs!: Subscription;
  // processInfoSubs!: Subscription;
  // processMappingsSubs!: Subscription;

  // processInfo$!: Observable<IAEProcessDetail>;
  // processesForSelectedProfile$!: Observable<string[]>;

  // ngOnInit(): void {
  //   this.createTriggerForm = new TriggerForm(this._formBuilder).InitForm();

  //   // Fetch details of all the servers
  //   this.allServers$ = this._serversService.GetAllServers$();

  //   // Keep eye of value change of Server Name
  //   this.selectedServer$ = (
  //     this.createTriggerForm.controls['server'] as FormGroup
  //   ).controls['serverName'].valueChanges.pipe(
  //     share(),
  //     debounceTime(500),
  //     distinctUntilChanged(),
  //     switchMap((selectedServerName: string) => {
  //       return this._serversService.GetServerByServerName(selectedServerName);
  //     })
  //   );

  //   this.processesForSelectedProfile$ = this.selectedServer$.pipe(
  //     tap((selectedServer: IAEServer) => {
  //       this.GetAllDeployedProcessesWithInputParams(selectedServer);
  //     }),
  //     switchMap((selectedServer: IAEServer) =>
  //       this.GetAllProfileToProcessMappings(selectedServer)
  //     ),
  //     tap((profileToProcessMapping) => {
  //       this.SetProfiles(profileToProcessMapping);
  //     }),
  //     switchMap((profileProcessMappings: IAEPPMapping) =>
  //       this.GetProcessesForSelectedProfile(profileProcessMappings)
  //     ),
  //     share()
  //   );
  // }

  // GetAllDeployedProcessesWithInputParams(selectedServer: IAEServer) {
  //   const nullProcess: IAEProcessDetail = {
  //     processName: '',
  //     version: '',
  //     processInputs: [],
  //   };
  //   this.processInfo$ = this.createTriggerForm.controls[
  //     'processName'
  //   ].valueChanges.pipe(
  //     switchMap((processName: string) =>
  //       processName.includes('Select a proces')
  //         ? of(nullProcess)
  //         : this._aeService.GetAllDeployedProcessesWithInputParams(
  //             selectedServer.serverName,
  //             selectedServer.dbName,
  //             processName
  //           )
  //     ),
  //     tap((processInfo: IAEProcessDetail) => {
  //       if (this.formsArr.length > 0) {
  //         while (this.formsArr.length !== 0) {
  //           this.formsArr.removeAt(0);
  //         }
  //       }

  //       const processInputs = processInfo?.processInputs;
  //       if (processInputs) {
  //         processInputs.forEach((processInput: string) => {
  //           this.addProcessInput(processInput, '');
  //         });
  //       } else {
  //         alert(`Selected Process is not deployed in control tower`);
  //       }
  //     }),
  //     share()
  //   );
  // }

  // GetAllProfileToProcessMappings(
  //   selectedServer: IAEServer
  // ): Observable<IAEPPMapping> {
  //   this.isServerSelected = true;
  //   this.isProfileFetched =
  //     this.isProfileSelected =
  //     this.isProcessesFetched =
  //       false;
  //   this.createTriggerForm.controls['server'].patchValue({ ...selectedServer });
  //   console.log(this.createTriggerForm.value);
  //   this.selectedServer = selectedServer;
  //   return this._aeService.GetAllProfileToProcessMappings(
  //     selectedServer.serverName,
  //     selectedServer.dbName
  //   );
  // }

  // SetProfiles(profileToProcessMapping: IAEPPMapping) {
  //   this.isProfileFetched = true;
  //   this.createTriggerForm.patchValue({
  //     profileName: 'Select a profile...',
  //   });
  //   this.profileToProcessMapping = profileToProcessMapping;
  // }

  // GetProcessesForSelectedProfile(
  //   profileProcessMappings: IAEPPMapping
  // ): Observable<string[]> {
  //   return this.createTriggerForm.controls['profileName'].valueChanges.pipe(
  //     switchMap((selectedProfile: string) => {
  //       if (
  //         typeof selectedProfile === 'string' &&
  //         selectedProfile != 'Select a profile...'
  //       ) {
  //         this.isProcessesFetched = true;
  //         this.createTriggerForm.patchValue({
  //           processName: 'Select a process...',
  //         });
  //       }
  //       this.isProfileSelected = true;
  //       this.mappedProcesses = profileProcessMappings[selectedProfile];
  //       return of(profileProcessMappings[selectedProfile]);
  //     })
  //   );
  // }

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

  deleteAllProcessInputs() {
    if (this.formsArr.length > 0) {
      while (this.formsArr.length !== 0) {
        this.formsArr.removeAt(0);
      }
    }
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
    // if (this.processMappingsSubs) {
    //   this.processMappingsSubs.unsubscribe();
    // }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TriggerForm } from 'src/app/core/forms/uipath/trigger.form';
import { TriggersService } from 'src/app/core/services/uipath/triggers.service';
import { RouteNames } from 'src/app/core/constants/route.names';

@Component({
  selector: 'app-view-or-edit-trigger',
  templateUrl: './view-or-edit-trigger.component.html',
  styleUrls: ['./view-or-edit-trigger.component.scss'],
})
export class ViewOrEditTriggerComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _triggersService: TriggersService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  viewOrEditTriggerForm!: FormGroup;
  server$!: Observable<IUiPathServer>;
  trigger$!: Observable<IUiPathTrigger>;
  triggerServerData$!: Observable<[IUiPathTrigger, IUiPathServer]>;
  routeParams$!: Observable<Params>;

  ngOnInit(): void {
    this.routeParams$ = this._route.params;

    this.viewOrEditTriggerForm = new TriggerForm(this._formBuilder).InitForm();

    this.trigger$ = this._triggersService.trigger$.pipe(
      tap((trigger: IUiPathTrigger) => {
        if (trigger?.id) {
          this.viewOrEditTriggerForm.patchValue(trigger);
          for (let index = 0; index < trigger.processInputs.length; index++) {
            let inputParam = trigger.processInputs[index];
            this.addProcessInput(inputParam['name'], inputParam['value']);
          }
          this.viewOrEditTriggerForm.controls['server'].patchValue({
            ...(<IUiPathServer>trigger.server),
          });
        } else {
          this._router.navigate([
            RouteNames.getRoutePathByName('trigger-view-all'),
          ]);
        }
      })
    );
  }

  get formsArr() {
    return this.viewOrEditTriggerForm.get('processInputs') as FormArray;
  }

  addProcessInput(name: string, value: string) {
    this.formsArr.push(
      new TriggerForm(this._formBuilder).initProcessInputRows(name, value)
    );
  }

  deleteProcessInput(index: number) {
    this.formsArr.removeAt(index);
  }

  UpdateTrigger(id: number) {
    this._triggersService
      .UpdateTrigger(id, this.viewOrEditTriggerForm.value)
      .subscribe((_) => {
        this._router.navigate([
          RouteNames.getRoutePathByName('trigger-view-all'),
        ]);
      });
  }
}

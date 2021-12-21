import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { RouteNames } from 'src/app/core/constants/route.names';
import { SchedulesService } from 'src/app/core/services/uipath/schedules.service';
import { TriggersService } from 'src/app/core/services/uipath/triggers.service';

@Component({
  selector: 'app-trigger',
  templateUrl: './trigger.component.html',
  styleUrls: ['./trigger.component.scss'],
})
export class TriggerComponent implements OnInit {
  addScheduleSubs!: Subscription;
  deleteTriggerSubs!: Subscription;

  @Input('trigger') trigger!: IUiPathTrigger;
  @Input('triggerIndex') triggerIndex!: number;

  @Output('deletedTrigger') deletedTrigger: EventEmitter<IUiPathTrigger> =
    new EventEmitter<IUiPathTrigger>();

  constructor(
    private _router: Router,
    private _triggersService: TriggersService,
    private _schedulesService: SchedulesService
  ) {}

  ngOnInit() {}

  EditTrigger(triggerData: IUiPathTrigger) {
    this._triggersService.trigger = triggerData;
    this._router.navigate([
      RouteNames.getRoutePathByName('trigger-home'),
      triggerData.id,
      'edit',
    ]);
  }

  ViewTrigger(triggerData: IUiPathTrigger) {
    this._triggersService.trigger = triggerData;
    this._router.navigate([
      RouteNames.getRoutePathByName('trigger-home'),
      triggerData.id,
      'view',
    ]);
  }

  DeleteTrigger(trigger: IUiPathTrigger) {
    if (
      confirm(
        `Do you want to delete the Trigger with name ${trigger.triggerName} ?\n
This will delete all the entities using this trigger i.e Schedules, Execution, etc.`
      )
    ) {
      this.deleteTriggerSubs = this._triggersService
        .DeleteTrigger(trigger.id)
        .subscribe(
          (deletedTrigger: IUiPathTrigger) => {
            this.deletedTrigger.emit(deletedTrigger);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  ExecuteTrigger(trigger: IUiPathTrigger) {
    const instantSchedule: IUiPathSchedule = {
      id: 0,
      status: '',
      occurOnceDateTime: null,
      recurringEndDate: null,
      recurringStartDate: null,
      recurringTime: null,
      recurringType: 'Now',
      scheduleName: 'Now',
      trigger: trigger.id,
      userName: (<IUser>(
        JSON.parse(sessionStorage.getItem('userToken') || '').user
      )).username,
    };
    this.addScheduleSubs = this._schedulesService
      .AddSchedule(instantSchedule)
      .subscribe(
        (_) => {
          this._router.navigate([
            RouteNames.getRoutePathByName('schedule-view'),
            'all',
          ]);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  ngOnDestroy() {
    if (this.deleteTriggerSubs) {
      this.deleteTriggerSubs.unsubscribe();
    }
    if (this.addScheduleSubs) {
      this.addScheduleSubs.unsubscribe();
    }
  }
}

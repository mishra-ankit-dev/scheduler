import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ScheduleForm } from 'src/app/core/forms/uipath/schedule.form';
import { SchedulesService } from 'src/app/core/services/uipath/schedules.service';
import { TriggersService } from 'src/app/core/services/uipath/triggers.service';
import { RouteNames } from 'src/app/core/constants/route.names';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss'],
})
export class CreateScheduleComponent implements OnInit, OnDestroy {
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _triggersService: TriggersService,
    private _schedulesService: SchedulesService
  ) {}
  scheduleTriggerForm!: FormGroup;
  allTriggers$!: Observable<IUiPathTrigger[]>;
  recurringTypeChangeValue$!: Observable<string>;

  addScheduleSubs!: Subscription;

  ngOnInit() {
    this.scheduleTriggerForm = new ScheduleForm(this._formBuilder).InitForm();
    this.allTriggers$ = this._triggersService.GetAllTriggers();
    this.recurringTypeChangeValue$ =
      this.scheduleTriggerForm.controls['recurringType'].valueChanges.pipe();
  }

  AddSchedule() {
    this.addScheduleSubs = this._schedulesService
      .AddSchedule(this.scheduleTriggerForm.value)
      .subscribe(
        (_) => {
          this._router.navigate([
            RouteNames.getRoutePathByName('schedule-view'),
            'all',
          ]);
        },
        (err) => {
          console.log(err);
          alert(err.message);
        }
      );
  }

  ngOnDestroy() {
    if (this.addScheduleSubs) {
      this.addScheduleSubs.unsubscribe();
    }
  }
}

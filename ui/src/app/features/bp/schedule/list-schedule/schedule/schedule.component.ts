import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { SchedulesService } from 'src/app/core/services/bp/schedules.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  deleteScheduleSubs!: Subscription;
  allSchedules$!: Observable<IBPSchedule[]>;

  @Input('schedule') schedule!: IBPSchedule;
  @Input('scheduleIndex') scheduleIndex!: number;

  @Output('deletedSchedule') deletedSchedule: EventEmitter<IBPSchedule> =
    new EventEmitter<IBPSchedule>();

  constructor(private _schedulesService: SchedulesService) {}

  ngOnInit() {}

  DeleteSchedule(schedule: IBPSchedule) {
    if (
      confirm(
        `Do you want to delete the Schedule with name ${schedule.scheduleName} ?\n
This will delete all the entities using this schedule i.e Execution, etc.`
      )
    ) {
      this.deleteScheduleSubs = this._schedulesService
        .DeleteSchedule(schedule.id)
        .subscribe((deletedSchedule: IBPSchedule) => {
          this.deletedSchedule.emit(deletedSchedule);
        });
    }
  }

  ngOnDestroy() {
    if (this.deleteScheduleSubs) {
      this.deleteScheduleSubs.unsubscribe();
    }
  }
}

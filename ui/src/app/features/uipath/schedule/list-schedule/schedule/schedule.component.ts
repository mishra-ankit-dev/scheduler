import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { SchedulesService } from 'src/app/core/services/uipath/schedules.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  deleteScheduleSubs!: Subscription;

  @Input('schedule') schedule!: IUiPathSchedule;
  @Input('scheduleIndex') scheduleIndex!: number;

  @Output('deletedSchedule') deletedSchedule: EventEmitter<IUiPathSchedule> =
    new EventEmitter<IUiPathSchedule>();

  constructor(private _schedulesService: SchedulesService) {}

  ngOnInit() {}

  DeleteSchedule(schedule: IUiPathSchedule) {
    if (
      confirm(
        `Do you want to delete the Schedule with name ${schedule.scheduleName} ?\n
This will delete all the entities using this schedule i.e Execution, etc.`
      )
    ) {
      this.deleteScheduleSubs = this._schedulesService
        .DeleteSchedule(schedule.id)
        .subscribe((deletedSchedule: IUiPathSchedule) => {
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

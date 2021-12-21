import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { SchedulesService } from 'src/app/core/services/bp/schedules.service';
import { CommonService } from 'src/app/core/services/site-layout/common.service';

@Component({
  selector: 'app-list-schedule',
  templateUrl: './list-schedule.component.html',
  styleUrls: ['./list-schedule.component.scss'],
})
export class ListScheduleComponent implements OnInit {
  routeSubs!: Subscription;
  allSchedules$!: Observable<IBPSchedule[]>;

  constructor(
    private _route: ActivatedRoute,
    private _commonService: CommonService,
    private _schedulesService: SchedulesService
  ) {}

  ngOnInit() {
    this.routeSubs = this._route.params.subscribe((params) => {
      this.allSchedules$ = this._schedulesService.GetAllSchedules(
        params.filter
      );
    });
  }

  onScheduleDelete(event: IBPSchedule) {
    this.ngOnDestroy();
    this.ngOnInit();
  }

  ngOnDestroy() {
    if (this.routeSubs) {
      this.routeSubs.unsubscribe();
    }
    this._commonService.searchBoxTypedKeywords = '';
  }
}

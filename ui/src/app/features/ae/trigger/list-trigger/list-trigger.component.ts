import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TriggersService } from 'src/app/core/services/ae/triggers.service';
import { CommonService } from 'src/app/core/services/site-layout/common.service';

@Component({
  selector: 'app-list-trigger',
  templateUrl: './list-trigger.component.html',
  styleUrls: ['./list-trigger.component.scss'],
})
export class ListTriggerComponent implements OnInit, OnDestroy {
  allTriggers$!: Observable<IAETrigger[]>;

  constructor(
    private _commonService: CommonService,
    private _triggerService: TriggersService
  ) {}

  ngOnInit(): void {
    this.allTriggers$ = this._triggerService.GetAllTriggers();
  }

  onTriggerDelete(_: IAETrigger) {
    this.ngOnInit();
  }

  ngOnDestroy() {
    this._commonService.searchBoxTypedKeywords = '';
  }
}

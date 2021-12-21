import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TriggersService } from 'src/app/core/services/bp/triggers.service';
import { CommonService } from 'src/app/core/services/site-layout/common.service';

@Component({
  selector: 'app-list-trigger',
  templateUrl: './list-trigger.component.html',
  styleUrls: ['./list-trigger.component.scss'],
})
export class ListTriggerComponent implements OnInit {
  allTriggers$!: Observable<IBPTrigger[]>;

  constructor(
    private _commonService: CommonService,
    private _triggerService: TriggersService
  ) {}

  ngOnInit(): void {
    this.allTriggers$ = this._triggerService.GetAllTriggers();
  }

  onTriggerDelete(_: IBPTrigger) {
    this.ngOnInit();
  }

  ngOnDestroy() {
    this._commonService.searchBoxTypedKeywords = '';
  }
}

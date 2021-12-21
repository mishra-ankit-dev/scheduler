import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/core/services/site-layout/common.service';
import { TriggersService } from 'src/app/core/services/uipath/triggers.service';

@Component({
  selector: 'app-list-trigger',
  templateUrl: './list-trigger.component.html',
  styleUrls: ['./list-trigger.component.scss'],
})
export class ListTriggerComponent implements OnInit {
  allTriggers$!: Observable<IUiPathTrigger[]>;

  constructor(
    private _commonService: CommonService,
    private _triggerService: TriggersService
  ) {}

  ngOnInit(): void {
    this.allTriggers$ = this._triggerService.GetAllTriggers();
  }

  onTriggerDelete(_: IUiPathTrigger) {
    this.ngOnInit();
  }

  ngOnDestroy() {
    this._commonService.searchBoxTypedKeywords = '';
  }
}

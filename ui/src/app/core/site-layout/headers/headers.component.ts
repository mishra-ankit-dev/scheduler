import { Component, OnInit } from '@angular/core';
import { NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../../services/site-layout/common.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss'],
})
export class HeadersComponent implements OnInit {
  currentRouteURL$!: Observable<NavigationStart>;
  constructor(private _commonService: CommonService) {}

  ngOnInit(): void {
    // this.currentRouteURL$ = this._commonService.currentRouteURL$();
  }
}

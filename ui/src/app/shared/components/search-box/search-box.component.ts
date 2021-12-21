import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share, switchMap, tap } from 'rxjs/operators';
import { CommonService } from 'src/app/core/services/site-layout/common.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  constructor(private _commonService: CommonService) {}

  ngOnInit(): void {
    this._commonService.listenClicks$
      .pipe(
        tap(() => this._commonService.listen()),
        share()
      )
      .subscribe();
  }

  get placeholder$() {
    return this._commonService.placeholder$;
  }

  set searchBoxTypedKeywords(value: string) {
    this._commonService.searchBoxTypedKeywords = value;
  }

  get searchBoxKeywords$(): Observable<string> {
    return this._commonService.searchBoxKeywords$;
  }

  get listenClicks$(): Observable<string> {
    return this._commonService.listenClicks$;
  }

  set listenClicks(value: string) {
    this._commonService.listenClicks = value;
  }
}

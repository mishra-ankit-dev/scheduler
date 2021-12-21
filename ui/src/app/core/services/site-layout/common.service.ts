import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutingService } from './routing.service';
import { NavigationEnd } from '@angular/router';
import { SearchBoxService } from './search-box.service';
import { SpeechService } from './speech.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(
    private _speechService: SpeechService,
    private _routingService: RoutingService,
    private _searchBoxService: SearchBoxService
  ) {}

  // For RoutingService
  currentRouteURL$(): Observable<NavigationEnd> {
    return this._routingService.currentRouteURL$;
  }

  // For SearchBoxService
  get placeholder$() {
    return this._searchBoxService.placeholder$;
  }

  set placeholder(placeholder: string) {
    this._searchBoxService.placeholder = placeholder;
  }

  set searchBoxTypedKeywords(value: string) {
    this._searchBoxService.searchBoxTypedKeywords = value;
  }

  get searchBoxKeywords$(): Observable<string> {
    return this._searchBoxService.searchBoxKeywords$;
  }

  ProcessKeywords(
    keyword: string = '',
    data: any = null,
    processingMethod: any
  ) {
    return this._searchBoxService.ProcessKeywords(
      keyword,
      data,
      processingMethod
    );
  }

  get listenClicks$() {
    return this._searchBoxService.listenClicks$;
  }
  set listenClicks(value: string) {
    this._searchBoxService.listenClicks = value;
  }

  //  For SpeechService
  get spokenKeywords$(): Observable<string> {
    return this._speechService.spokenKeywords$;
  }

  listen() {
    return this._speechService.listen();
  }

  GetCSRFToken(cookieKey: string): string {
    const cookies = document.cookie.split(';');
    for (var index in cookies) {
      const cookie = cookies[index];
      if (cookie.includes(cookieKey)) {
        return cookie.split('=')[1];
      }
    }
    return '';
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  share,
  startWith,
} from 'rxjs/operators';
import { SpeechService } from './speech.service';

@Injectable({
  providedIn: 'root',
})
export class SearchBoxService {
  constructor(private _speechService: SpeechService) {}

  // Subject for Search Box
  public _listenClicksSubject$ = new Subject<string>();
  private _listenClicks$ = this._listenClicksSubject$.asObservable();

  get listenClicks$(): Observable<string> {
    return this._listenClicks$;
  }
  set listenClicks(value: string) {
    this._listenClicksSubject$.next(value);
  }

  // Subject for search Box placeholder
  private _placeholderSubject$ = new BehaviorSubject<string>('');
  private _placeholder$ = this._placeholderSubject$.asObservable().pipe(
    share(),
    startWith('home'),
    debounceTime(500),
    distinctUntilChanged(
      (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
    )
  );

  get placeholder$() {
    return this._placeholder$;
  }

  set placeholder(placeholder: string) {
    this._placeholderSubject$.next(placeholder);
  }

  // Subject for Search Box
  private _searchBoxTypedKeywordsSubject$ = new BehaviorSubject<string>('');
  private _searchBoxTypedKeywords$ = this._searchBoxTypedKeywordsSubject$
    .asObservable()
    .pipe(
      share(),
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    );

  // get searchBoxTypedKeywords$(): Observable<string> {
  //   return this._searchBoxTypedKeywords$;
  // }

  set searchBoxTypedKeywords(value: string) {
    this._searchBoxTypedKeywordsSubject$.next(value);
  }

  private _searchBoxKeywords$ = merge(
    this._speechService.spokenKeywords$,
    this._searchBoxTypedKeywords$
  );

  get searchBoxKeywords$(): Observable<string> {
    return this._searchBoxKeywords$;
  }

  ProcessKeywords(
    keyword: string = '',
    data: any = null,
    processingMethod: any
  ): any {
    return processingMethod(keyword, data);
  }
}

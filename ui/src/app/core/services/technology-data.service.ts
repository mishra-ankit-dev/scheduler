import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  share,
  startWith,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TechnologyDataService {
  constructor() {}

  // Subject for search Box placeholder
  private _currentTechnologySubject$ = new BehaviorSubject<string>('ae');
  private _currentTechnology$ = this._currentTechnologySubject$
    .asObservable()
    .pipe(
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      ),
      share()
    );

  get currentTechnology$(): Observable<string> {
    return this._currentTechnology$;
  }

  set currentTechnology(technology: string) {
    this._currentTechnologySubject$.next(technology);
    console.log('Technology Selected as : ' + technology);
  }
}

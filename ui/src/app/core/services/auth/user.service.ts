import { Injectable } from '@angular/core';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { share, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// All Interfaces

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedInUser!: IUser;
  private _USERS_URL: string = 'backend/users/';

  constructor(private _http: HttpClient) {
    if (sessionStorage.length > 0) {
      this.setLoggedInUser$(
        <IUser>JSON.parse(sessionStorage.getItem('userToken') || '').user
      );
    }
  }

  // Subject for Logged In User
  private _loggedInUserSubject$ = new BehaviorSubject<IUser>(<IUser>{});
  private _loggedInUser$ = this._loggedInUserSubject$
    .asObservable()
    .pipe(
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    );

  getLoggedInUser$(): Observable<IUser> {
    return this._loggedInUser$;
  }
  setLoggedInUser$(value: IUser) {
    this._loggedInUserSubject$.next(value);
  }

  // Subject for All Users
  private _allUsersSubject$ = new BehaviorSubject<IUser[]>([]);
  private _allUsers$ = this._allUsersSubject$
    .asObservable()
    .pipe(
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    );

  getAllUsers$(): Observable<IUser[]> {
    return this._allUsers$;
  }
  setAllUsers$(value: IUser[]) {
    this._allUsersSubject$.next(value);
  }

  //  Subject for User Profile
  private _userProfileSubject$ = new BehaviorSubject<IProfile>(<IProfile>{});
  private _userProfile$ = this._userProfileSubject$
    .asObservable()
    .pipe(
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    );

  getUserProfile$(): Observable<IProfile> {
    return this._userProfile$;
  }
  setUserProfile$(value: IProfile) {
    this._userProfileSubject$.next(value);
  }

  //  Subject for All User's Profile
  private _allUsersProfileSubject$ = new BehaviorSubject<IProfile[]>([]);
  private _allUsersProfile$ = this._allUsersProfileSubject$
    .asObservable()
    .pipe(
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      )
    );

  getAllUserProfile$(): Observable<IProfile[]> {
    return this._allUsersProfile$;
  }
  setAllUserProfile$(value: IProfile[]) {
    this._allUsersProfileSubject$.next(value);
  }

  ProcessKeywords(keyword = null, data = null, processingMethod: any) {
    return processingMethod(keyword, data);
  }

  GetUserById(id: number): Observable<IUser> {
    return this._http.get<IUser>(`${this._USERS_URL}${id}/`).pipe(share());
  }

  GetUserProfileById(id: number): Observable<IProfile> {
    return this._http
      .get<IProfile>(`${this._USERS_URL}profiles/${id}/`)
      .pipe(share());
  }

  allUsers$: Observable<IUser[]> = this._http
    .get<IUser[]>(this._USERS_URL)
    .pipe(share());

  GetAllUsers(): Observable<IUser[]> {
    return this._http.get<IUser[]>(this._USERS_URL).pipe(share());
  }

  allUserProfiles$: Observable<IProfile[]> = this._http
    .get<IProfile[]>(`${this._USERS_URL}profiles/`)
    .pipe(share());

  EditProfile(profileData: IProfile): Observable<IProfile> {
    return this._http
      .patch<IProfile>(
        `${this._USERS_URL}profiles/${profileData.user}/`,
        profileData
      )
      .pipe(share());
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

// account model with one property, whether user is new across devices
export interface IAccount {
  id: string | null;
  newUser?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private _http: HttpClient) {}

  GetAccount(): Observable<IAccount> {
    // a real url would be /account
    const result = this._http.get('/auth/me').pipe(
      map((response) => {
        // Testing dummy data
        return {
          id: null,
          newUser: true,
        };
      })
    ) as Observable<IAccount>;
    return result;
  }

  // also a SaveAccount to set newUser flag to false
  // would leave that to you
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAuthInfo } from './auth.model';

// to make a cookie readable in SSR, inject the token from nguniversal module
// import { REQUEST } from '@nguniversal/express-engine/tokens';
// and make Request available in NodeJs
// import { Request } from 'express';

@Injectable({ providedIn: 'root' })
export class AuthState {
  // create an internal subject and an observable to keep track
  private stateItem: BehaviorSubject<IAuthInfo | null> = new BehaviorSubject(
    null
  ) as any;
  stateItem$: Observable<IAuthInfo | null> = this.stateItem.asObservable();

  // redirect update
  get redirectUrl(): string {
    const url = localStorage.getItem('redirectUrl');
    if (!url) return '/private/dashboard';
    return url;
  }
  set redirectUrl(value: string) {
    localStorage.setItem('redirectUrl', value);
  }

  constructor(
    private router: Router // to inject the REQUEST token, we do this: // @Optional() @Inject(REQUEST) private request: Request
  ) {
    // simpler to initiate state here
    // check item validity
    const _localuser: IAuthInfo = this._GetUser() as IAuthInfo;

    if (this.CheckAuth(_localuser)) {
      this.SetState(_localuser);
    } else {
      this.Logout(false);
    }
  }
  // shall move soon to state service
  SetState(item: IAuthInfo) {
    this.stateItem.next(item);
    return this.stateItem$;
  }
  UpdateState(item: Partial<IAuthInfo>) {
    const newItem = { ...this.stateItem.getValue(), ...item };
    this.stateItem.next(newItem);
    return this.stateItem$;
  }
  RemoveState() {
    this.stateItem.next(null);
  }

  // localstorage related methods
  private _SaveUser(user: IAuthInfo) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  private _RemoveUser() {
    localStorage.removeItem('user');
  }

  private _GetUser(): IAuthInfo | null {
    // to make it work in SSR, uncomment
    /*
    if (this.request) {
      const _serverCookie = this.request.cookies['CrCookie'];
      if (_serverCookie) {
        try {
          return JSON.parse(_serverCookie);
        } catch (e) {
          // silence
        }
      }
    }
    */
    const user = localStorage.getItem('user');
    if (!user) return null;

    const _localuser: IAuthInfo = JSON.parse(user);
    if (_localuser && _localuser.accessToken) {
      return <IAuthInfo>_localuser;
    } else {
      return null;
    }
  }

  // adding cookie saving methods
  private _SetCookie(user: IAuthInfo) {
    // save cookie with user, be selective in real life as to what to save in cookie
    let cookieStr =
      encodeURIComponent('CrCookie') +
      '=' +
      encodeURIComponent(JSON.stringify(user));

    // use expiration tp expire the cookie
    const dtExpires = new Date(user.expiresAt || '');

    cookieStr += ';expires=' + dtExpires.toUTCString();
    cookieStr += ';path=/';
    // some good security measures:
    cookieStr += ';samesite=lax';
    // when in production
    // cookieStr += ';secure';

    // be strong:
    document.cookie = cookieStr;
  }
  private _DeleteCookie(): void {
    // void accessToken but more importantly expire
    this._SetCookie({ accessToken: '', expiresAt: 0 });
  }

  // new saveSessions method
  SaveSession(user: IAuthInfo): IAuthInfo | null {
    if (user.accessToken) {
      this._SaveUser(user);
      this.SetState(user);
      return user;
    } else {
      // remove token from user
      this._RemoveUser();
      this.RemoveState();
      return null;
    }
  }

  UpdateSession(user: IAuthInfo) {
    const _localuser: IAuthInfo | null = this._GetUser();
    if (_localuser) {
      // only set accesstoken and refreshtoken
      _localuser.accessToken = user.accessToken;
      _localuser.refreshToken = user.refreshToken;

      this._SaveUser(_localuser);
      this.UpdateState(user);
    } else {
      // remove token from user
      this._RemoveUser();
      this.RemoveState();
    }
  }

  CheckAuth(user: IAuthInfo) {
    // if no user, or no accessToken, something terrible must have happened
    if (!user || !user.accessToken) {
      return false;
    }
    // if now is larger that expiresAt, it expired
    if (!!user.expiresAt && Date.now() > user.expiresAt) {
      return false;
    }

    return true;
  }

  // reroute optionally
  Logout(reroute: boolean = false) {
    // remove leftover
    this.RemoveState();
    // and clean localstroage
    this._RemoveUser();

    if (reroute) {
      this.router.navigateByUrl('/public/login');
    }
  }

  GetToken() {
    const _auth = this.stateItem.getValue();
    // check if auth is still valid first before you return
    return _auth && this.CheckAuth(_auth) ? _auth.accessToken : null;
  }
  GetRefreshToken() {
    const _auth = this.stateItem.getValue();
    // check if auth is still valid first before you return
    return _auth && this.CheckAuth(_auth) ? _auth.refreshToken : null;
  }
}

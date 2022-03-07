import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { autoLogout } from 'src/app/modules/@auth/state/auth.actions';

import { User } from 'src/app/modules/@auth/user.model';

import { IAppState } from 'src/app/state/app.state';

import {
  IAuthResponseData,
  IRegisterResponseData,
} from '../../interfaces/auth/user.interface';

import { AccountApi } from '../api/account.api';

import jwt_decode from 'jwt-decode'

import { IApiResponse } from '../../interfaces/api.response';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  timeoutInterval: any;
  redirectAfterLogin:string = '/';

  constructor(private api: AccountApi, private store: Store<IAppState>) {}

  login(data: FormData): Observable<IAuthResponseData> {
    return this.api.login(data);
  }

  register(data: any): Observable<IRegisterResponseData> {
    return this.api.register(data);
  }

  check(type:string):Observable<IApiResponse<boolean>> {
    return this.api.check(type);
  }

  // generateErrorMessages(error: any) {
  //   return Object.keys(error.errors).reduce((acc: any, el) => {
  //     acc.push(...error.errors[el]);
  //     return acc;
  //   }, []);
  // }

  setTokenInLocalStorage(token:string) {
    localStorage.setItem('token', token);
  }

  getUserFromLocalStorage() {
    const token = window.localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const decodedToken:any = jwt_decode(token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    const user = new User(
      decodedToken.username,
      token,
      expirationDate,
      decodedToken.userId,
      decodedToken?.roles.split(", "),
    );
    this.runTimeoutInterval(user);
    return user;
  }

  runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = new Date(user.expireDate).getTime();
    const timeInterval = expirationDate - todaysDate;

    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(autoLogout());
    }, timeInterval);
  }

  logout() {
    localStorage.clear();
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }
}

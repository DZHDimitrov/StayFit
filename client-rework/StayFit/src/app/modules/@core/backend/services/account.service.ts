import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { User } from 'src/app/modules/@auth/user.model';

import { IAppState } from 'src/app/state/app.state';

import { AccountApi } from '../api/account.api';

import jwt_decode from 'jwt-decode';

import { IApiResponse } from '../../interfaces/api.response';
import { ILoginResponse } from 'src/app/modules/@auth/models/login.model';
import { IRegisterRequest, IRegisterResponse } from 'src/app/modules/@auth/models/register.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  redirectAfterLogin: string = '/';

  constructor(private api: AccountApi) {}

  login(data: FormData): Observable<ILoginResponse> {
    return this.api.login(data);
  }

  register(data: IRegisterRequest): Observable<IApiResponse<IRegisterResponse>> {
    return this.api.register(data);
  }

  setTokenInLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }

  getUserFromLocalStorage() {
    const token = window.localStorage.getItem('token');

    if (!token) return null;

    const decodedToken: any = jwt_decode(token);

    const expirationDate = new Date(decodedToken.exp * 1000);

    const user = new User(
      decodedToken.username,
      token,
      expirationDate,
      decodedToken.userId,
      decodedToken?.roles.split(', ')
    );

    return user;
  }

  logout() {
    localStorage.clear();
  }
}

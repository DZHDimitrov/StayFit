import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLogout } from 'src/app/modules/@auth/state/auth.actions';
import { User } from 'src/app/modules/@auth/user.model';
import { IAppState } from 'src/app/state/app.state';
import {
  IAuthResponseData,
  IRegisterResponseData,
} from '../../interfaces/responses/auth/user.res';
import { AccountApi } from '../api/account.api';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  timeoutInterval: any;

  constructor(private api: AccountApi, private store: Store<IAppState>) {}

  login(data: FormData): Observable<IAuthResponseData> {
    return this.api.login(data);
  }

  register(data: any): Observable<IRegisterResponseData> {
    return this.api.register(data);
  }

  generateUser(data: IAuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +data.expires_in);
    const user = new User(
      data.username,
      data.access_token,
      expirationDate,
      data.userId
    );
    return user;
  }

  generateErrorMessages(error: any) {
    return Object.keys(error.errors).reduce((acc: any, el) => {
      acc.push(...error.errors[el]);
      return acc;
    }, []);
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  getUserFromLocalStorage() {
    const userDataString = window.localStorage.getItem('userData');
    if (!userDataString) {
      return null;
    }
    const parsedUser = JSON.parse(userDataString);
    const expirationDate = parsedUser.expirationDate;
    const user = new User(
      parsedUser.username,
      parsedUser.token,
      expirationDate,
      parsedUser.userId
    );
    this.runTimeoutInterval(user);
    return user;
  }

  runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = new Date(user.expireDate).getTime();
    const timeInterval = expirationDate - todaysDate;
    console.log(timeInterval);

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

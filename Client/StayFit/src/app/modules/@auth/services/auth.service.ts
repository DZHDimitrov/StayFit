import { Injectable } from '@angular/core';
import { AccountApi } from '../../core/backend/api/account.api';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private service: AccountApi) {}

  login(data: FormData) {
    return this.service.login(data);
  }

  private setSession() {
    // const expiresAt = moment().add(authResult.expiresIn,'second');
    // localStorage.setItem('id_token', authResult.idToken);
    // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }
  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration: any = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}

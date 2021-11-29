import { Injectable } from '@angular/core';
import { AccountService } from '../../@core/backend/services/account.service';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private accountService: AccountService) {}

  login(username: string, password: string) {
    const formData = new FormData();
    formData.set('username', username);
    formData.set('password', password);
    this.accountService
      .login(formData)
      .pipe(shareReplay())
      .subscribe((x) => {
        this.setSession(x);
      });
  }

  private setSession(authResult: any) {
    localStorage.setItem('id_token', authResult.access_token);
    localStorage.setItem('expires_at', (new Date().getTime() + +authResult.expires_in).toString());
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return new Date().getTime() < +this.getExpiration()!
  }

  private getExpiration() {
    return localStorage.getItem('expires_at');
  }
}

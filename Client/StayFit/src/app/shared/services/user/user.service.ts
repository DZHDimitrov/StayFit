import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from '../../interfaces/User';
import {
  ILoginRequest,
  IRegisterRequest,
  IRegisterResponse,
} from '../../interfaces/AuthRequests';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { ApiMethod } from 'src/app/core/services/conts';

@Injectable()
export class UserService {
  User: IUser | undefined;

  get isLoggedIn() {
    return this.User ? true : false;
  }

  constructor(private http: HttpService) {}

  login(loginDetails: ILoginRequest): Observable<IUser> {
    return this.http.requestCall('/users/login',ApiMethod.POST,loginDetails);
  }

  register(registerDetails: IRegisterRequest): Observable<any> {
    return this.http.requestCall('/users/register',ApiMethod.POST,registerDetails);
  }

  logout() {
    localStorage.clear();
    this.User = undefined;
  }
}

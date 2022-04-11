import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IApiResponse } from '../../interfaces/api.response';

import { HttpService } from './http.service';

import { IRegisterRequest, IRegisterResponse } from 'src/app/modules/@auth/models/register.model';

import { ILoginResponse } from 'src/app/modules/@auth/models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AccountApi {
  private readonly apiController: string = 'account';

  constructor(private api: HttpService) {}

  login(data: FormData): Observable<ILoginResponse> {
    return this.api.post(`${this.apiController}/login`, data);
  }

  register(data: IRegisterRequest): Observable<IApiResponse<IRegisterResponse>> {
    return this.api.post(`${this.apiController}/register`, data);
  }
}

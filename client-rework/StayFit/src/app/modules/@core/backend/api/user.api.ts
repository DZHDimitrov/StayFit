import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { IModifyRoleRequest } from 'src/app/modules/admin/models/admin-requests.model';

import { IRole } from 'src/app/modules/admin/models/roles.model';

import { IUserInRole } from 'src/app/modules/admin/models/usersInRole.model';

import { IApiResponse } from '../../interfaces/api.response';

import { HttpService } from './http.service';

@Injectable()
export class UserApi {
  private readonly apiController = 'user';

  constructor(private api: HttpService) {}

  getRoles(): Observable<IApiResponse<IRole[]>> {
    return this.api.get(`${this.apiController}/roles`);
  }

  getUsersInRole(roleId: string): Observable<IApiResponse<IUserInRole[]>> {
    return this.api.get(`${this.apiController}/roles/${roleId}`);
  }

  modifyRole(roleId:string,data:IModifyRoleRequest):Observable<IApiResponse<string>> {
      return this.api.post(`${this.apiController}/roles/${roleId}`,data);
  }

  removeRole(roleId:string):Observable<IApiResponse<string>> {
      return this.api.delete(`${this.apiController}/roles/${roleId}`);
  }
}

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IModifyRoleRequest } from 'src/app/modules/admin/models/admin-requests.model';

import { IRole } from 'src/app/modules/admin/models/roles.model';

import { IUserInRole } from 'src/app/modules/admin/models/usersInRole.model';

import { IApiResponse } from '../../interfaces/api.response';

import { UserApi } from '../api/user.api';

@Injectable()
export class UserService {
  constructor(private api: UserApi) {}

  getRoles(): Observable<IApiResponse<IRole[]>> {
    return this.api.getRoles();
  }

  getUsersInRole(roleId: string): Observable<IApiResponse<IUserInRole[]>> {
    return this.api.getUsersInRole(roleId);
  }

  modifyRole(roleId: string,data: IModifyRoleRequest): Observable<IApiResponse<string>> {
    return this.api.modifyRole(roleId, data);
  }

  removeRole(roleId: string): Observable<IApiResponse<string>> {
    return this.api.removeRole(roleId);
  }
}

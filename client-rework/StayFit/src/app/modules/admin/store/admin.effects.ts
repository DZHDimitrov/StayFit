import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';

import { map, switchMap, tap } from 'rxjs/operators';

import { UserService } from '../../@core/backend/services/user.service';

import {
  loadRoles,
  loadRolesSuccess,
  loadUsersInRole,
  loadUsersInRoleSuccess,
  modifyRole,
  modifyRoleSuccess,
  removeRole,
  removeRoleSuccess,
} from './admin.actions';

@Injectable()
export class AdminEffects {
  constructor(private actions$: Actions, private userService: UserService,private toastr:ToastrService) {}

  loadRoles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadRoles),
      switchMap(({ payload }) => {
        return this.userService.getRoles().pipe(
          map((res) => {
            return loadRolesSuccess({ roles: res.data });
          })
        );
      })
    );
  });

  loadUsersInRole$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUsersInRole),
      switchMap(({ payload }) => {
        return this.userService.getUsersInRole(payload.roleId).pipe(
          map((res) => {
            return loadUsersInRoleSuccess({ usersInRole: res.data });
          })
        );
      })
    );
  });

  modifyRole$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(modifyRole),
      switchMap(({ payload }) => {
        return this.userService.modifyRole(payload.roleId, payload.data).pipe(
          map((res) => {
            return modifyRoleSuccess({ modifiedId: res.data,toAdd:payload.data.toAdd });
          })
        );
      })
    );
  });

  removeRole$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeRole),
      switchMap(({ payload }) => {
        return this.userService.removeRole(payload.roleId).pipe(
          map((res) => {
            return removeRoleSuccess({ roleId:res.data });
          })
        );
      })
    );
  });

  removeRoleSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeRoleSuccess),
      tap(action => {
        this.toastr.success('Ролята беше премахната успешно','Success')
      })
    )
  },{dispatch:false})
}

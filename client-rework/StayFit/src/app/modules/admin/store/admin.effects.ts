import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ToastrService } from 'ngx-toastr';

import { of } from 'rxjs';

import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { UserService } from '../../@core/backend/services/user.service';

import {
  loadRoles,
  loadRolesFailure,
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
  constructor(private actions$: Actions, private userService: UserService,private toastr:ToastrService,private router:Router) {}

  loadRoles$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadRoles),
      switchMap(({ payload }) => {
        return this.userService.getRoles().pipe(
          map((res) => {
            if (res.isOk) {
              return loadRolesSuccess({ roles: res.data });
            }
            return loadRolesFailure({error:res.Errors[0].Error})
          }),
          catchError(err => {
            return of(loadRolesFailure({error:err.error.error}))
          })
        );
      })
    );
  });

  loadRolesFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadRolesFailure),
      tap(({payload}) => {
        this.toastr.error(payload.error ?? 'Възникна грешка', 'Error');
        this.router.navigate(['/']);
      })
    )
  },{dispatch:false})

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

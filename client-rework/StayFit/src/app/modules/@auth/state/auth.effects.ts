import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { IAppState } from 'src/app/state/app.state';
import { AccountService } from '../../@core/backend/services/account.service';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '../../shared/state/shared.actions';
import {
  autoLogin,
  autoLogout,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private store: Store<IAppState>,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        const formData = new FormData();
        formData.set('username', action.username);
        formData.set('password', action.password);
        return this.accountService.login(formData).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const user = this.accountService.generateUser(data);
            this.accountService.setUserInLocalStorage(user);
            this.toastr.success('Влязохте успешно!', 'Success');
            return loginSuccess({ user });
          }),
          catchError((err) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.toastr.error(err.error, 'Error');
            return of(setErrorMessage({ message: err.error }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          // this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  registerRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(registerSuccess),
        tap((action) => {
          this.router.navigate(['account', 'login']);
        })
      );
    },
    { dispatch: false }
  );

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerStart),
      exhaustMap((action) => {
        const data = {
          firstName: action.firstName,
          lastName: action.lastName,
          username: action.username,
          email: action.email,
          password: action.password,
          gender: action.gender,
        };
        return this.accountService.register(data).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return registerSuccess({ userId: data.id });
          }),
          catchError((res) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const messages = this.accountService.generateErrorMessages(
              res.error
            );
            setTimeout(() => {
              this.store.dispatch(setErrorMessage({ message: '' }));
            }, 3000);
            return of(setErrorMessage({ message: messages[0] }));
          })
        );
      })
    );
  });
  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user: any = this.accountService.getUserFromLocalStorage();
        return of(loginSuccess({ user }));
      })
    );
  });
  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogout),
        map((action) => {
          this.accountService.logout();
          this.router.navigate(['account', 'login']);
        })
      );
    },
    { dispatch: false }
  );
}

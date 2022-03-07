import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';

import { ToastrService } from 'ngx-toastr';

import { of } from 'rxjs';

import { catchError, debounceTime, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { IAppState } from 'src/app/state/app.state';

import { AccountService } from '../../@core/backend/services/account.service';

import {
  setErrorMessage,
  setLoadingSpinner,
} from '../../shared/state/shared.actions';

import { User } from '../user.model';

import {
  autoLogin,
  autoLogout,
  checkDiaryOnwer,
  checkDiaryOwnerSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
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
      tap(action => {
        this.store.dispatch(setLoadingSpinner({ status: true }));
      }),
      debounceTime(1000),
      exhaustMap((action) => {
        const formData = new FormData();
        formData.set('username', action.username);
        formData.set('password', action.password);

        return this.accountService.login(formData).pipe(
          map((data) => {
            this.accountService.setTokenInLocalStorage(data.access_token);

            const user:any = this.accountService.getUserFromLocalStorage();

            return loginSuccess({ user:user as User });
          }),
          catchError((err) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));

            this.toastr.error(err.error, 'Error');

            // return of(setErrorMessage({ message: err.error }));
            return of(loginFailure());
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
          this.store.dispatch(setLoadingSpinner({ status: false }));

          this.toastr.success('Влязохте успешно!', 'Success');

          this.store.dispatch(checkDiaryOnwer());

          const path = ['/',...this.accountService.redirectAfterLogin.split('/').filter(x=> x !=='')];

          this.router.navigate(path);

          this.accountService.redirectAfterLogin = '/';
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

          this.store.dispatch(setLoadingSpinner({ status: false }));
        })
      );
    },
    { dispatch: false }
  );

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerStart),
      tap(action => {
        this.store.dispatch(setLoadingSpinner({ status: true }));
      }),
      debounceTime(1000),
      exhaustMap((action) => {

        return this.accountService.register({...action}).pipe(
          map((data) => {
            return registerSuccess({ userId: data.id });
          }),
          catchError((err) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));

            this.toastr.error(err.error, 'Error');
            // const messages = this.accountService.generateErrorMessages(res.error);

            // setTimeout(() => {
            //   this.store.dispatch(setErrorMessage({ message: '' }));
            // }, 3000);

            // return of(setErrorMessage({ message: messages[0] }));
            return of(registerFailure())
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
        if (user){
          return of(loginSuccess({ user }));
        }
        return of(loginFailure())
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

  checkDiaryOwner$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(checkDiaryOnwer),
        switchMap(({payload}) => {
          return this.accountService.check('diary').pipe(
            map(res => {
              return checkDiaryOwnerSuccess({isDiaryOwner:res.data})
            })
          )
        })
      )
    }
  )
}

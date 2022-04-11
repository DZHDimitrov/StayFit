import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';

import { ToastrService } from 'ngx-toastr';

import { of } from 'rxjs';

import {
  catchError,
  debounceTime,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';

import { IAppState } from 'src/app/state/app.state';

import { AccountService } from '../../@core/backend/services/account.service';

import { DiaryService } from '../../@core/backend/services/diary.service';

import { setLoadingSpinner } from '../../shared/state/shared.actions';

import { User } from '../user.model';

import {
  autoLogin,
  autoLoginFailure,
  autoLogout,
  checkDiaryOnwer,
  checkDiaryOwnerSuccess,
  login,
  loginFailure,
  loginSuccess,
  register,
  registerFailure,
  reigsterSuccess,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private diaryService:DiaryService,
    private store: Store<IAppState>,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      tap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: true }));
      }),
      debounceTime(1000),
      exhaustMap(({payload}) => {
        const formData = new FormData();
        formData.set('username', payload.data.username);
        formData.set('password', payload.data.password);

        return this.accountService.login(formData).pipe(
          map((res) => {
            this.accountService.setTokenInLocalStorage(res.access_token);

            const user: any = this.accountService.getUserFromLocalStorage();

            return loginSuccess({ user: user as User ,withRedirection:true});
          }),
          catchError((err) => {
            return of(loginFailure({error:err.error}));
          })
        );
      })
    );
  });

  loginFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginFailure),
      tap(({payload}) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));

        this.toastr.error(payload.error, 'Error');
      })
    )
  },{dispatch:false})


  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap(({payload}) => {
          this.store.dispatch(setLoadingSpinner({ status: false }));

          if(payload.withRedirection){
            this.toastr.success('Влязохте успешно!', 'Success');

            const path = [
              '/',
              ...this.accountService.redirectAfterLogin
              .split('/')
              .filter((x) => x !== ''),
            ];
            
            this.router.navigate(path);
            
            this.accountService.redirectAfterLogin = '/';
          }
          
          this.store.dispatch(checkDiaryOnwer());
          
        })
      );
    },
    { dispatch: false }
  );

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(register),
      tap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: true }));
      }),
      debounceTime(1000),
      exhaustMap(({payload}) => {
        return this.accountService.register({ ...payload.data }).pipe(
          map(({data}) => {
            return reigsterSuccess({ userId: data._id });
          }),
          catchError((err) => {
            return of(registerFailure());
          })
        );
      })
    );
  });

  registerRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(reigsterSuccess),
        tap((action) => {
          this.router.navigate(['account', 'login']);

          this.toastr.success('Успешна регистрация!', 'Success');

          this.store.dispatch(setLoadingSpinner({ status: false }));
        })
      );
    },
    { dispatch: false }
  );

  registerFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerFailure),
      tap(action => {
        this.store.dispatch(setLoadingSpinner({ status: false }));

        this.toastr.error('Неуспешна регистрация', 'Error');
      })
    )
  },{dispatch:false})

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {

        const user: any = this.accountService.getUserFromLocalStorage();

        if (user) {
          return of(loginSuccess({ user ,withRedirection:false}));
        }

        return of(autoLoginFailure());
      })
    );
  });

  autoLoginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccess),
      tap(action => {
        this.store.dispatch(checkDiaryOnwer());
      })
    )
  },{dispatch:false})

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

  checkDiaryOwner$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(checkDiaryOnwer),
      switchMap(({ payload }) => {
        return this.diaryService.isOwner().pipe(
          map((res) => {
            return checkDiaryOwnerSuccess({ isDiaryOwner: res.data });
          })
        );
      })
    );
  });
}

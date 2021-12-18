import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { IAppState } from 'src/app/state/app.state';
import { autoLogout, loginSuccess } from '../../@auth/state/auth.actions';
import {
  GUEST_NAV_ITEMS,
  USER_NAV_ITEMS,
} from '../misc/content/navigation.content';
import { GUEST_ITEMS, USER_ITEMS } from '../misc/content/user-menu.content';
import { setNavMenu, setUserMenu } from './theme.actions';

@Injectable()
export class ThemeEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
  ) {}

  setUserMenu$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap((x) => {
          this.store.dispatch(setUserMenu({ menuItems: USER_ITEMS }));
          this.store.dispatch(setNavMenu({ navItems: USER_NAV_ITEMS }));
        })
      );
    },
    { dispatch: false }
  );
  setGuestMenu$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogout),
        tap((x) => {
          this.store.dispatch(setUserMenu({ menuItems: GUEST_ITEMS }));
          this.store.dispatch(setNavMenu({ navItems: GUEST_NAV_ITEMS }));
        })
      );
    },
    { dispatch: false }
  );
}

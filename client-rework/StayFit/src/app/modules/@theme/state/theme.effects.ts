import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';

import { switchMap, tap } from 'rxjs/operators';

import { IAppState } from 'src/app/state/app.state';

import { autoLogout, loginSuccess } from '../../@auth/state/auth.actions';

import { getDiaryOwnerState } from '../../@auth/state/auth.selector';

import { AccountService } from '../../@core/backend/services/account.service';

import { DiaryService } from '../../@core/backend/services/diary.service';
import {
  GUEST_NAV_ITEMS,
  USER_NAV_ITEMS_DIARY,
  USER_NAV_ITEMS_NO_DIARY,
} from '../misc/content/navigation.content';

import { GUEST_ITEMS, USER_ITEMS } from '../misc/content/user-menu.content';

import { setNavMenu, setUserMenu } from './theme.actions';

@Injectable()
export class ThemeEffects {
  constructor(
    private actions$: Actions,
    private diaryService:DiaryService,
    private accountService:AccountService,
    private store: Store<IAppState>,
  ) {}

  setUserMenu$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        switchMap((x) => {
          return this.store.select(getDiaryOwnerState);
        }),
        tap(userHasDiary => {
          this.store.dispatch(setUserMenu({ menuItems: USER_ITEMS }));
          if (!userHasDiary) {
            this.store.dispatch(setNavMenu({ navItems: USER_NAV_ITEMS_NO_DIARY }));
          } else {
            this.store.dispatch(setNavMenu({navItems:USER_NAV_ITEMS_DIARY}));
          }
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

import { NbMenuItem } from '@nebular/theme';
import { createAction, props } from '@ngrx/store';

export const SET_USER_MENU = '[theme] user menu';
export const SET_NAV_MENU = '[theme] nav menu';
// export const SET_GUEST_MENU = '[theme] guest menu';
// export const SET_ADMIN_MENU = '[theme] admin menu';

export const setUserMenu = createAction(
  SET_USER_MENU,
  props<{ menuItems: NbMenuItem[] }>()
);

export const setNavMenu = createAction(
  SET_NAV_MENU,
  props<{ navItems: any[] }>()
);

// export const setGuestMenu = createAction(
//   SET_GUEST_MENU,
//   props<{ menuItems: NbMenuItem[] }>()
// );

// export const setAdminMenu = createAction(
//   SET_ADMIN_MENU,
//   props<{ menuItems: NbMenuItem[] }>()
// );

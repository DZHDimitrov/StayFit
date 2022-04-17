import { createAction, props } from '@ngrx/store';

import { INavItem } from '../misc/content/navigation.content';

import { IMenuItem } from '../misc/content/user-menu.content';

export const SET_USER_MENU = '[theme] user menu';
export const SET_NAV_MENU = '[theme] nav menu';

export const setUserMenu = createAction(
  SET_USER_MENU,
  props<{ menuItems: IMenuItem[] }>()
);

export const setNavMenu = createAction(
  SET_NAV_MENU,
  props<{ navItems: INavItem[] }>()
);



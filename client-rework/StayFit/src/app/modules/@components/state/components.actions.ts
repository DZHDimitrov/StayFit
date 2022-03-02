import { createAction, props } from '@ngrx/store';

export const SET_MINI_NAVBAR = '[components] set mini navbar';
export const SET_MINI_NAVBAR_SUCCESS =
  '[components] set mini navbar success';

export const SET_FOODS_INTRO_TITLE = '[components] set foods INTRO title';

export const setMiniNavbar = createAction(
  SET_MINI_NAVBAR,
  props<{title:string,navItems:string[]}>()
);

export const setFoodsIntroTitle = createAction(
  SET_FOODS_INTRO_TITLE,
  props<{ title: string }>()
);

import { createAction, props } from '@ngrx/store';
import { IInnerNavBar } from '../interfaces/navbar.interface';

export const SET_INNER_NAV_ITEMS = '[components] inner nav items';
export const SET_INNER_NAV_ITEMS_SUCCESS =
  '[components] set inner nav items success';
export const SET_INNER_NAV_TITLE = '[components] inner nav title';

export const SET_FOODS_INTRO_TITLE = '[components] set foods INTRO title';

export const setInnerNav = createAction(
  SET_INNER_NAV_ITEMS,
  props<{ navBar: IInnerNavBar; hasChildren?: boolean }>()
);

export const setFoodsIntroTitle = createAction(
  SET_FOODS_INTRO_TITLE,
  props<{ title: string }>()
);

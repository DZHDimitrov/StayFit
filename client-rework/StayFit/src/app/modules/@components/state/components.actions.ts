import { createAction, props } from '@ngrx/store';
import { IInnerNavBar } from '../interfaces/navbar.interface';

export const SET_INNER_NAV_ITEMS = '[components] inner nav items';
export const INNER_NAV_ITEMS_LOADED = '[components] inner nav items loaded';
export const SET_INNER_NAV_TITLE = '[components] inner nav title';

export const setInnerNav = createAction(
  SET_INNER_NAV_ITEMS,
  props<{ navBar: IInnerNavBar; hasChildren?: boolean }>()
);

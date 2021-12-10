import { createAction, props } from '@ngrx/store';
import { Readings } from '../../@core/enums/reading.category';

export const SET_INNER_NAV_ITEMS = '[components] inner nav items';
export const INNER_NAV_ITEMS_LOADED = '[components] inner nav items loaded';
export const SET_INNER_NAV_TITLE = '[components] inner nav title';

export const setInnerNavItems = createAction(
  SET_INNER_NAV_ITEMS,
  props<{ category?: Readings }>()
);

export const innerNavItemsLoaded = createAction(
  INNER_NAV_ITEMS_LOADED,
  props<{ navItems: any[] }>()
);

export const setInnerNavTitle = createAction(
  SET_INNER_NAV_TITLE,
  props<{ title: string }>()
);

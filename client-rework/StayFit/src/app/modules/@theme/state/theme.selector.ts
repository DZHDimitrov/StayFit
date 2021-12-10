import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IThemeState } from './theme.state';

export const THEME_STATE_NAME = 'theme state';

export const getThemeState =
  createFeatureSelector<IThemeState>(THEME_STATE_NAME);

export const getMenuItems = createSelector(getThemeState, (state) => {
  return state.menuItems;
});

export const getNavItems = createSelector(getThemeState, (state) => {
  return state.navItems;
});

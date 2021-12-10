import { createReducer, on } from '@ngrx/store';
import { setNavMenu, setUserMenu } from './theme.actions';
import { initialState } from './theme.state';

const _themeReducer = createReducer(
  initialState,
  on(setUserMenu, (state, action) => {
    return {
      ...state,
      menuItems: action.menuItems,
    };
  }),
  on(setNavMenu, (state, action) => {
    return {
      ...state,
      navItems: action.navItems,
    };
  })
);

export function ThemeReducer(state, action) {
  return _themeReducer(state, action);
}

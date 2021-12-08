import { AuthReducer } from '../modules/@auth/state/auth.reducer';
import { AUTH_STATE_NAME } from '../modules/@auth/state/auth.selector';
import { IAuthState } from '../modules/@auth/state/auth.state';
import { ComponentsReducer } from '../modules/@components/state/components.reducer';
import { COMPONENTS_STATE_NAME } from '../modules/@components/state/components.selector';
import { IComponentState } from '../modules/@components/state/components.state';
import { PagesReducer } from '../modules/@pages/store/pages.reducer';
import { PAGES_STATE_NAME } from '../modules/@pages/store/pages.selector';
import { IPagesState } from '../modules/@pages/store/pages.state';
import { ThemeReducer } from '../modules/@theme/state/theme.reducer';
import { THEME_STATE_NAME } from '../modules/@theme/state/theme.selector';
import { IThemeState } from '../modules/@theme/state/theme.state';
import { SharedReducer } from '../modules/shared/state/shared.reducer';
import { SHARED_STATE_NAME } from '../modules/shared/state/shared.selector';
import { ISharedState } from '../modules/shared/state/shared.state';

export interface IAppState {
  [SHARED_STATE_NAME]: ISharedState;
  [AUTH_STATE_NAME]: IAuthState;
  [THEME_STATE_NAME]: IThemeState;
  [COMPONENTS_STATE_NAME]: IComponentState;
  [PAGES_STATE_NAME]: IPagesState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
  [THEME_STATE_NAME]: ThemeReducer,
  [COMPONENTS_STATE_NAME]: ComponentsReducer,
  [PAGES_STATE_NAME]: PagesReducer,
};

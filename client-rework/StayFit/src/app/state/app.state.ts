import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { AuthReducer } from '../modules/@auth/state/auth.reducer';
import { AUTH_STATE_NAME } from '../modules/@auth/state/auth.selector';
import { IAuthState } from '../modules/@auth/state/auth.state';
import { ComponentsReducer } from '../modules/@components/state/components.reducer';
import { COMPONENTS_STATE_NAME } from '../modules/@components/state/components.selector';
import { IComponentState } from '../modules/@components/state/components.state';
import { FoodsReducer } from '../modules/@pages/foods/store/foods.reducer';
import { FOODS_STATE_NAME } from '../modules/@pages/foods/store/foods.selector';
import { IFoodsState } from '../modules/@pages/foods/store/foods.state';
import { PagesReducer } from '../modules/@pages/knowledge/store/knowledge.reducer';
import { KNOWLEDGE_STATE_NAME } from '../modules/@pages/knowledge/store/knowledge.selector';
import { IKnowledgeState } from '../modules/@pages/knowledge/store/knowledge.state';
import { ThemeReducer } from '../modules/@theme/state/theme.reducer';
import { THEME_STATE_NAME } from '../modules/@theme/state/theme.selector';
import { IThemeState } from '../modules/@theme/state/theme.state';
import { AdminReducer } from '../modules/admin/store/admin.reducer';
import { ADMIN_STATE_NAME } from '../modules/admin/store/admin.selector';
import { IAdminState } from '../modules/admin/store/admin.state';
import { SharedReducer } from '../modules/shared/state/shared.reducer';
import { SHARED_STATE_NAME } from '../modules/shared/state/shared.selector';
import { ISharedState } from '../modules/shared/state/shared.state';

export interface IAppState {
  [SHARED_STATE_NAME]: ISharedState;
  [AUTH_STATE_NAME]: IAuthState;
  [THEME_STATE_NAME]: IThemeState;
  [COMPONENTS_STATE_NAME]: IComponentState;
  [KNOWLEDGE_STATE_NAME]: IKnowledgeState;
  [ADMIN_STATE_NAME]:IAdminState;
  [FOODS_STATE_NAME]:IFoodsState;
  router:RouterReducerState,
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
  [THEME_STATE_NAME]: ThemeReducer,
  [COMPONENTS_STATE_NAME]: ComponentsReducer,
  [KNOWLEDGE_STATE_NAME]: PagesReducer,
  [ADMIN_STATE_NAME]:AdminReducer,
  [FOODS_STATE_NAME]:FoodsReducer,
  router:routerReducer,
};

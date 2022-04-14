import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { AuthReducer } from '../modules/@auth/state/auth.reducer';
import { AUTH_STATE_NAME } from '../modules/@auth/state/auth.selector';
import { IAuthState } from '../modules/@auth/state/auth.state';
import { ComponentsReducer } from '../modules/@components/state/components.reducer';
import { COMPONENTS_STATE_NAME } from '../modules/@components/state/components.selector';
import { IComponentState } from '../modules/@components/state/components.state';
import { DashboardReducer } from '../modules/@pages/dashboard/store/dashboard.reducer';
import { DASHBOARD_STATE_NAME } from '../modules/@pages/dashboard/store/dashboard.selectors';
import { IDashboardState } from '../modules/@pages/dashboard/store/dashboard.state';
import { DiaryReducer } from '../modules/@pages/diary/store/diary.reducer';
import { DIARY_STATE_NAME } from '../modules/@pages/diary/store/diary.selectors';
import { IDiaryState } from '../modules/@pages/diary/store/diary.state';
import { FoodsReducer } from '../modules/@pages/foods/store/foods.reducer';
import { FOODS_STATE_NAME } from '../modules/@pages/foods/store/foods.selector';
import { IFoodsState } from '../modules/@pages/foods/store/foods.state';
import { ProgressReducer } from '../modules/@pages/progress/store/progress.reducer';
import { PROGRESS_STATE_NAME } from '../modules/@pages/progress/store/progress.selectors';
import { IProgressState } from '../modules/@pages/progress/store/progress.state';
import { ReadingsReducer } from '../modules/@pages/readings/store/readings.reducer';
import { READINGS_STATE_NAME } from '../modules/@pages/readings/store/readings.selector';
import { IReadingsState } from '../modules/@pages/readings/store/readings.state';
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
  [READINGS_STATE_NAME]: IReadingsState;
  [FOODS_STATE_NAME]:IFoodsState;
  [DIARY_STATE_NAME]:IDiaryState;
  [DASHBOARD_STATE_NAME]:IDashboardState;
  [PROGRESS_STATE_NAME]:IProgressState;
  [ADMIN_STATE_NAME]:IAdminState;
  router:RouterReducerState,
}

export const appReducer:any = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
  [THEME_STATE_NAME]: ThemeReducer,
  [COMPONENTS_STATE_NAME]: ComponentsReducer,
  [READINGS_STATE_NAME]: ReadingsReducer,
  [FOODS_STATE_NAME]:FoodsReducer,
  [DIARY_STATE_NAME]:DiaryReducer,
  [DASHBOARD_STATE_NAME]:DashboardReducer,
  [PROGRESS_STATE_NAME]:ProgressReducer,
  [ADMIN_STATE_NAME]:AdminReducer,
  router:routerReducer,
};

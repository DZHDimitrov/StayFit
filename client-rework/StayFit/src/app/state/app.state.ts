import { AuthReducer } from '../modules/@auth/state/auth.reducer';
import { AUTH_STATE_NAME } from '../modules/@auth/state/auth.selector';
import { IAuthState } from '../modules/@auth/state/auth.state';
import { SharedReducer } from '../modules/shared/state/shared.reducer';
import { SHARED_STATE_NAME } from '../modules/shared/state/shared.selector';
import { ISharedState } from '../modules/shared/state/shared.state';

export interface IAppState {
  [SHARED_STATE_NAME]: ISharedState;
  [AUTH_STATE_NAME]: IAuthState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
};

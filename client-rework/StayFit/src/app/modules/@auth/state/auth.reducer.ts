import { Action, createReducer, on } from '@ngrx/store';
import { autoLogout, loginSuccess, } from './auth.actions';
import { initialState } from './auth.state';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(autoLogout,state => {
    return {
      ...state,
      user: null,
    }
  })
);

export function AuthReducer(state, action:Action) {
  return _authReducer(state, action);
}

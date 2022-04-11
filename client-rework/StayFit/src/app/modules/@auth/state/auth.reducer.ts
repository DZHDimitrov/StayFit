import { Action, createReducer, on } from '@ngrx/store';

import { autoLoginSuccess, checkDiaryOwnerSuccess, loginSuccess, setRequestedURL, } from './auth.actions';

import { initialState } from './auth.state';

const _authReducer = createReducer(
  initialState,

  on(loginSuccess, (state, {payload}) => {
    return {
      ...state,
      user: payload.user,
    };
  }),
  
  on(autoLoginSuccess,(state,{payload}) => {
    return {
      ...state,
      user:payload.user,
    }
  }),

  on(checkDiaryOwnerSuccess,(state,{payload}) => {
    return {
      ...state,
      isDiaryOwner:payload.isDiaryOwner
    }
  }),
  
  on(setRequestedURL, (state, {payload}) => {
    return {
      ...state,
      requestedURL: payload.url,
    };
  })
);

export function AuthReducer(state, action:Action) {
  return _authReducer(state, action);
}

export function logoutClearState(reducer) {
  return function (state, action) {
      if (action.type === '[auth] auto logout action') {
        state = undefined;
      }
      return reducer(state, action);
  };
}

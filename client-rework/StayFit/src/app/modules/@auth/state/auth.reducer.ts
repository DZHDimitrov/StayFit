import { Action, createReducer, on } from '@ngrx/store';

import { autoLogout, checkDiaryOwnerSuccess, loginSuccess, } from './auth.actions';

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
  }),

  on(checkDiaryOwnerSuccess,(state,{payload}) => {
    return {
      ...state,
      isDiaryOwner:payload.isDiaryOwner
    }
  })
);

export function AuthReducer(state, action:Action) {
  return _authReducer(state, action);
}

export function logoutClearState(reducer) {
  return function (state, action) {
      if (action.type === '[auth page] auto logout') {
        state = undefined;
      }
      return reducer(state, action);
  };
}

import { createAction, props } from '@ngrx/store';

import { createHTTPActions } from '../../@core/utility/store-actions.helper';

import { User } from '../user.model';

export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAILURE = '[auth page] login fail';

export const REGISTER_START = '[auth page] register start';
export const REGISTER_SUCCESS = '[auth page] register success';
export const REGISTER_FAILURE = '[auth page] register failure';

export const AUTO_LOGIN_ACTION = '[auth page] auto login';
export const AUTO_LOGOUT_ACTION = '[auth page] auto logout';

export const loginStart = createAction(
  LOGIN_START,
  props<{ username: string; password: string }>()
);

export const registerStart = createAction(
  REGISTER_START,
  props<{
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    gender?: string;
  }>()
);

export const registerSuccess = createAction(
  REGISTER_SUCCESS,
  props<{ userId: string }>()
);

export const registerFailure = createAction(REGISTER_FAILURE)

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: User }>()
);

export const loginFailure = createAction(
  LOGIN_FAILURE
)


export const autoLogin = createAction(AUTO_LOGIN_ACTION);

export const autoLogout = createAction(AUTO_LOGOUT_ACTION);

export const [checkDiaryOnwer,checkDiaryOwnerSuccess] =
 createHTTPActions<{},{isDiaryOwner:boolean}>('[auth] check diary owner');

import { createHTTPActions } from '../../@core/utility/store-actions.helper';
import { ILoginRequest } from '../models/login.model';
import { IRegisterRequest } from '../models/register.model';

import { User } from '../user.model';

export const [login, loginSuccess, loginFailure] =
createHTTPActions<{ data:ILoginRequest },{ user: User,withRedirection:boolean },{error:string}>('[auth page] login');

export const [register, reigsterSuccess, registerFailure] =
createHTTPActions<{data:IRegisterRequest},{ userId: string },{}>('[auth page] register');

export const [autoLogin,autoLoginSuccess,autoLoginFailure] =
createHTTPActions<{},{user:User}>('[auth] auto login');

export const [autoLogout] = 
createHTTPActions<{}>('[auth] auto logout');

export const [checkDiaryOnwer, checkDiaryOwnerSuccess] =
createHTTPActions<{},{ isDiaryOwner: boolean }>('[auth] check diary owner');

export const [setRequestedURL] =
createHTTPActions<{url:string | null}>('[auth] set requested url')


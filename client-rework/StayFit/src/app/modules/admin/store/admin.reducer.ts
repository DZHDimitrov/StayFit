import { createReducer, on } from '@ngrx/store';
import { IRole } from '../models/roles.model';
import { loadRolesSuccess, loadUsersInRole, loadUsersInRoleSuccess, modifyRoleSuccess, removeRoleSuccess } from './admin.actions';

import { InitialState } from './admin.state';

export const _adminReducer = createReducer(
  InitialState,
  on(loadRolesSuccess,(state,{payload}) => {
      return {
          ...state,
          roles:payload.roles
      }
  }),

  on(loadUsersInRoleSuccess,(state,{payload}) => {
    return {
      ...state,
      usersInRole:payload.usersInRole,
    }
  }),

  on(modifyRoleSuccess,(state,{payload}) => {
    const roles:IRole[] = JSON.parse(JSON.stringify(state.roles));
    let role = roles.find(r => r.id === payload.modifiedId);

    if (role) {
      payload.toAdd ? role.usersInRole++ : role.usersInRole--;
    }
    
    return {
      ...state,
      roles
    }
  }),

  on(removeRoleSuccess,(state,{payload}) => {
    return  {
      ...state,
      roles:state.roles.filter(r => r.id !== payload.roleId)
    }
  })
);

export const AdminReducer = function (state, action) {
  return _adminReducer(state, action);
};

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAdminState } from './admin.state';

export const ADMIN_STATE_NAME = 'admin state name';

export const getAdminState =
  createFeatureSelector<IAdminState>(ADMIN_STATE_NAME);

export const getRoles = createSelector(getAdminState,(state) => {
    return state.roles;
})

export const getUsersInRole = createSelector(getAdminState,(state) => {
  return state.usersInRole;
})


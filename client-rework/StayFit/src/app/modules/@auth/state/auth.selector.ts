import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAuthState } from "./auth.state";

export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<IAuthState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState, (state) => {
    return state.user ? true : false;
})
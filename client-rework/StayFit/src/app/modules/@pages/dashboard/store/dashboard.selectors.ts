import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IDashboardState } from './dashboard.state';

export const DASHBOARD_STATE_NAME = 'dashboard';

export const getDashboardState =
  createFeatureSelector<IDashboardState>(DASHBOARD_STATE_NAME);

export const getTasks = createSelector(getDashboardState, (state) => {
  return state.tasks;
});

export const userHasDiary = createSelector(getDashboardState,(state) => {
  return !state.tasks.some(t => t.name.toLowerCase() == 'дневник')
})

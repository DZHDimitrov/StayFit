import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IProgressState } from './progress.state';

export const PROGRESS_STATE_NAME = 'progress';

export const getProgressState =
  createFeatureSelector<IProgressState>(PROGRESS_STATE_NAME);

export const getMeasurements = createSelector(getProgressState, (state) => {
  return state.measurements;
});

export const getMeasurement = createSelector(getProgressState,(state) => {
  return state.measurement;
})

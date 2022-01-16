import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IReadingsState } from './readings.state';

export const READINGS_STATE_NAME = 'readings';

const getReadingsState = createFeatureSelector<IReadingsState>(READINGS_STATE_NAME);

export const getLatestPreviews = createSelector(getReadingsState, (state) => {
  return state.latestPreviews;
});

export const getCatalogue = createSelector(getReadingsState, (state) => {
  return state.catalogue;
})

export const getReadingById = createSelector(getReadingsState,(state) => {
  return state.currentReading;
})

export const getMainCategories = createSelector(getReadingsState, (state) => {
  return state.mainCategories;
});

export const getSubCategories = createSelector(getReadingsState, (state) => {
  return state.subCategories;
});



import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPagesState } from './pages.state';

export const PAGES_STATE_NAME = 'pages';

const getPagesState = createFeatureSelector<IPagesState>(PAGES_STATE_NAME);

export const getLatestPreviews = createSelector(getPagesState, (state) => {
  return state.latestPreviews;
});

export const getCatalogue = createSelector(getPagesState, (state) => {
  return state.catalogue;
})

export const getReadingById = createSelector(getPagesState,(state) => {
  return state.currentReading;
})


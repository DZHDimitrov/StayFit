import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IKnowledgeState } from './knowledge.state';

export const KNOWLEDGE_STATE_NAME = 'knowledge';

const getPagesState = createFeatureSelector<IKnowledgeState>(KNOWLEDGE_STATE_NAME);

export const getLatestPreviews = createSelector(getPagesState, (state) => {
  return state.latestPreviews;
});

export const getCatalogue = createSelector(getPagesState, (state) => {
  return state.catalogue;
})

export const getReadingById = createSelector(getPagesState,(state) => {
  return state.currentReading;
})


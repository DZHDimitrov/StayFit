import { createReducer, on } from '@ngrx/store';

import {
  loadKnowledgeSuccess,
  loadSubCategoryWithPreviewsSuccess,
  loadReadingSuccess,
  resetReadingSubCategories,
  loadReadingMainCategoriesSuccess,
  loadMainCategoryWithPreviewsSuccess,
  loadReadingSubCategoriesSuccess,
} from './readings.actions';

import { initialState } from './readings.state';

export const _readingsReducer = createReducer(
  initialState,

  on(loadKnowledgeSuccess, (state, {payload}) => {
    return {
      ...state,
      knowledge:payload.knowledge
    };
  }),

  on(loadMainCategoryWithPreviewsSuccess, (state, {payload}) => {
    return {
      ...state,
      mainCategoryWithPreviews: payload.mainCategoryWithPreviews,
    };
  }),

  on(loadSubCategoryWithPreviewsSuccess, (state, {payload}) => {
    return {
      ...state,
      subCategoryWithPreviews: payload.subCategoryWithPreviews,
    };
  }),

  on(loadReadingSuccess, (state, {payload}) => {
    return {
      ...state,
      currentReading: payload.currentReading,
    };
  }),

  on(loadReadingMainCategoriesSuccess, (state, {payload}) => {
    return {
      ...state,
      mainCategories:payload.categories,
    };
  }),

  on(loadReadingSubCategoriesSuccess, (state, {payload}) => {
    return {
      ...state,
      subCategories:payload.categories,
    };
  }),
  
  on(resetReadingSubCategories, (state, action) => {
    return {
      ...state,
      subCategories: [],
    };
  }),
);

export const ReadingsReducer = function (state, action) {
  return _readingsReducer(state, action);
};

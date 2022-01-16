import { createReducer, on } from '@ngrx/store';
import {
  loadCategoriesLatestPreviewsSuccess,
  loadCatalogueByMainCategorySuccess,
  loadCatalogueBySubCategorySuccess,
  loadReadingByIdSuccess,
  loadReadingMainCategoriesSuccess,
  loadReadingSubCategoriesSuccess,
  resetReadingSubCategories,
} from './readings.actions';
import { initialState } from './readings.state';

export const _readingsReducer = createReducer(
  initialState,
  on(loadCategoriesLatestPreviewsSuccess, (state, action) => {
    return {
      ...state,
      latestPreviews: action.latestPreviews,
    };
  }),
  on(loadCatalogueByMainCategorySuccess, (state, action) => {
    return {
      ...state,
      catalogue: { previews: action.previews },
    };
  }),
  on(loadCatalogueBySubCategorySuccess, (state, action) => {
    return {
      ...state,
      catalogue: { previews: action.previews },
    };
  }),
  on(loadReadingByIdSuccess, (state, action) => {
    return {
      ...state,
      currentReading: action.currentReading,
    };
  }),
  on(loadReadingMainCategoriesSuccess, (state, action) => {
    return {
      ...state,
      mainCategories: action.mainCategories,
    };
  }),
  on(loadReadingSubCategoriesSuccess, (state, action) => {
    return {
      ...state,
      subCategories: action.subCategories,
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

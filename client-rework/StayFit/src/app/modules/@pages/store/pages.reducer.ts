import { createReducer, on } from '@ngrx/store';
import {
  loadCategoriesLatestPreviewsSuccess,
  loadCatalogueByMainCategorySuccess,
  loadCatalogueBySubCategorySuccess,
  loadReadingById,
  loadReadingByIdSuccess,
} from './pages.actions';
import { initialState } from './pages.state';

export const _pagesReducer = createReducer(
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
  })
);

export const PagesReducer = function (state, action) {
  return _pagesReducer(state, action);
};

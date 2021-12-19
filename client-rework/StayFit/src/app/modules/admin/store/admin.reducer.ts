import { createReducer, on } from '@ngrx/store';
import {
  loadReadingMainCategoriesSuccess,
  loadReadingSubCategoriesSuccess,
  resetReadingSubCategories,
} from './admin.actions';
import { InitialState } from './admin.state';

export const _adminReducer = createReducer(
  InitialState,
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
  })
);

export const AdminReducer = function (state, action) {
  return _adminReducer(state, action);
};

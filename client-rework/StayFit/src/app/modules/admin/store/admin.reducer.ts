import { createReducer, on } from '@ngrx/store';
import {
  loadReadingMainCategoriesSuccess,
  loadReadingSubCategoriesSuccess,
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
  })
);

export const AdminReducer = function (state, action) {
  return _adminReducer(state, action);
};

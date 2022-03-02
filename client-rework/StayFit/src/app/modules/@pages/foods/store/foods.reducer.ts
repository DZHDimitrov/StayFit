import { createReducer, on } from '@ngrx/store';

import {
  loadFoodByIdSuccess,
  loadFoodsByCategorySuccess,
  loadFoodsCategoriesSuccess,
  loadAutocompleteKeywordsSuccess,
  loadSearchedFoodSuccess,
  loadFoodTypesByCategoryIdSuccess,
  setFoodDetailsMode,
  editFoodByIdSuccess,
} from './foods.actions';

import { initialState } from './foods.state';

export const _foodsReducer = createReducer(
  initialState,

  on(loadFoodsCategoriesSuccess, (state, {payload}) => {
    return {
      ...state,
      foodsCategories: payload.foodCategories,
    };
  }),

  on(loadAutocompleteKeywordsSuccess, (state, {payload}) => {
    return {
      ...state,
      searchKeywords: payload.foods,
    };
  }),

  on(loadFoodsByCategorySuccess, (state, {payload}) => {
    return {
      ...state,
      foodsByCategory: payload.foods,
    };
  }),

  on(loadFoodByIdSuccess, (state, {payload}) => {
    return {
      ...state,
      foodDetails: payload.food,
    };
  }),

  on(loadSearchedFoodSuccess, (state, {payload}) => {
    return {
      ...state,
      searchedFood: payload.foods,
    };
  }),

  on(loadFoodTypesByCategoryIdSuccess, (state, {payload}) => {
    return {
      ...state,
      foodTypesByCategory: payload.foodTypes,
    };
  }),

  on(setFoodDetailsMode, (state, {payload}) => {
    return {
      ...state,
      editMode:payload.mode,
    };
  }),

  on(editFoodByIdSuccess, (state, {payload}) => {
    return {
      ...state,
      foodDetails: {
        ...state.foodDetails,
        calories: payload.data.calories,
        nutrients: payload.data.nutrients,
      },
    };
  })
);

export function FoodsReducer(state, action) {
  return _foodsReducer(state, action);
}

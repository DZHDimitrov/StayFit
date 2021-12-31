import { createReducer, on } from '@ngrx/store';
import {
  loadFoodByIdSuccess,
  loadFoodsByCategorySuccess,
  loadFoodsCategoriesSuccess,
  loadAutocompleteSearchedFoodSuccess,
} from './foods.actions';
import { initialState } from './foods.state';

export const _foodsReducer = createReducer(
  initialState,
  on(loadFoodsCategoriesSuccess, (state, action) => {
    return {
      ...state,
      foodsCategories: action.foodCategories,
    };
  }),
  on(loadAutocompleteSearchedFoodSuccess, (state, action) => {
    return {
      ...state,
      searchedFood: action.foods,
    };
  }),
  on(loadFoodsByCategorySuccess, (state, action) => {
    return {
      ...state,
      foodsByCategory: action.foods,
    };
  }),
  on(loadFoodByIdSuccess, (state, action) => {
    return {
      ...state,
      foodDetails: action.food,
    };
  })
);

export function FoodsReducer(state, action) {
  return _foodsReducer(state, action);
}

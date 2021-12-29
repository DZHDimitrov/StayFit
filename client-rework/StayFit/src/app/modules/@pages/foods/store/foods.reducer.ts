import { createReducer, on } from '@ngrx/store';
import {
  loadFoodsCategoriesSuccess,
  loadSearchedFoodSuccess,
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
  on(loadSearchedFoodSuccess, (state, action) => {
    return {
      ...state,
      searchedFood: action.foods,
    };
  })
);

export function FoodsReducer(state, action) {
  return _foodsReducer(state, action);
}

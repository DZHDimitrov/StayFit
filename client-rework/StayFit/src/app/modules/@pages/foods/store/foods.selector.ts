import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IFoodsState } from './foods.state';

export const FOODS_STATE_NAME = 'foods';

const getFoodsState = createFeatureSelector<IFoodsState>(FOODS_STATE_NAME);

export const getFoodsCategories = createSelector(getFoodsState, (state) => {
  return state.foodsCategories;
});

export const getSearchedFoods = createSelector(getFoodsState, (state) => {
  return state.searchedFood;
});

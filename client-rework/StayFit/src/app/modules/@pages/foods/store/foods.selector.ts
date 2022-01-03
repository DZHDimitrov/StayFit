import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IFoodsState } from './foods.state';

export const FOODS_STATE_NAME = 'foods';

const getFoodsState = createFeatureSelector<IFoodsState>(FOODS_STATE_NAME);

export const getFoodsCategories = createSelector(getFoodsState, (state) => {
  return state.foodsCategories;
});

export const getAutocompleteKeywords = createSelector(
  getFoodsState,
  (state) => {
    return state.autocompleteKeywords;
  }
);

export const getFoodsByCategory = createSelector(getFoodsState, (state) => {
  return state.foodsByCategory;
});

export const getFoodDetails = createSelector(getFoodsState, (state) => {
  return state.foodDetails;
});

export const getSearchedFood = createSelector(getFoodsState, (state) => {
  return state.searchedFood;
});

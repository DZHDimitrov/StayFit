import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAdminState } from './admin.state';

export const ADMIN_STATE_NAME = 'admin state name';

export const getAdminState =
  createFeatureSelector<IAdminState>(ADMIN_STATE_NAME);

export const getMainCategories = createSelector(getAdminState, (state) => {
  return state.mainCategories;
});

export const getSubCategories = createSelector(getAdminState, (state) => {
  return state.subCategories;
});

export const getFoodCategories = createSelector(getAdminState, (state) => {
  return state.food.categories;
});

export const getFoodsByCategory = createSelector(getAdminState, (state) => {
  return state.food.byCategory;
});

export const getNutrients = createSelector(getAdminState, (state) => {
  return state.food.nutrients;
});

export const getChosenNutrients = createSelector(getAdminState, (state) => {
  return state.food.chosenNutrients;
});

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { cyrillicToLatin } from 'src/app/modules/@core/utility/text-transilerator';

import { IFoodsState } from './foods.state';

export const FOODS_STATE_NAME = 'foods';

const getFoodsState = createFeatureSelector<IFoodsState>(FOODS_STATE_NAME);

export const getFoodsCategoriesWithNavigation = createSelector(getFoodsState, (state) => {
  return state.foodsCategories.map(c => {
    return {
      ...c,
      searchName: c.name
      .split(' ')
      .map((word) => {
        return cyrillicToLatin(word.toLowerCase());
      })
      .join('-'),
    }
  });
});

export const getFoodCategoriesSelection = createSelector(getFoodsState, (state) => {
  return state.foodsCategories.map(x=> {
    return {
      id:x.id,
      name:x.name,
    }
  });
});

export const getFoodsByCategory = createSelector(getFoodsState, (state) => {
  return state.foodsByCategory;
});

export const getFoodDetails = createSelector(getFoodsState, (state) => {
  return state.foodDetails;
});

export const getCoreNutrients = createSelector(getFoodsState,(state) => {
  return state.foodDetails.nutrients?.filter(n => n.name === 'Въглехидрати' || n.name === 'Мазнини' || n.name === 'Протеин');
})

export const getAllNutrients = createSelector(getFoodsState,(state) => {
  return state.foodDetails.nutrients?.filter(n=>n.name !== 'Протеин');
})

export const getSearchedFood = createSelector(getFoodsState, (state) => {
  return state.searchedFood;
});

export const getFoodTypesByCategory = createSelector(getFoodsState, (state) => {
  return state.foodTypesByCategory;
});

export const getFoodDetailsMode = createSelector(getFoodsState,(state) => {
  return state.editMode;
})
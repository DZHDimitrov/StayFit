import { createAction, props } from '@ngrx/store';
import { IFoodCategory } from 'src/app/modules/@core/interfaces/responses/foods/foods.res';

export const LOAD_CATEGORIES_ACTION = '[foods] load categories action';
export const LOAD_CATEGORIES_SUCCESS = '[foods] load categories success';
export const LOAD_CATEGORIES_FAILURE = '[foods] load categories failure';

export const LOAD_SEARCHED_FOOD_ACTION = '[foods] load searched food action';
export const LOAD_SEARCHED_FOOD_SUCCESS = '[foods] load searched food success';

export const loadFoodsCategories = createAction(LOAD_CATEGORIES_ACTION);
export const loadFoodsCategoriesSuccess = createAction(
  LOAD_CATEGORIES_SUCCESS,
  props<{ foodCategories: IFoodCategory[] }>()
);

export const loadSearchedFood = createAction(
  LOAD_SEARCHED_FOOD_ACTION,
  props<{ searchedFood: string }>()
);

export const loadSearchedFoodSuccess = createAction(
  LOAD_SEARCHED_FOOD_SUCCESS,
  props<{ foods: { id: number; foodNameId: number; searchName: string }[] }>()
);

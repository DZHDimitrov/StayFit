import { createAction, props } from '@ngrx/store';
import { IFoodCategory } from 'src/app/modules/@core/interfaces/responses/foods/foods.res';

export const LOAD_CATEGORIES_ACTION = '[foods] load categories action';
export const LOAD_CATEGORIES_SUCCESS = '[foods] load categories success';
export const LOAD_CATEGORIES_FAILURE = '[foods] load categories failure';

export const LOAD_SEARCHED_FOOD_ACTION = '[foods] load searched food action';
export const LOAD_SEARCHED_FOOD_SUCCESS = '[foods] load searched food success';

export const LOAD_FOODS_BY_CATEGORY = '[foods] load foods by category';
export const LOAD_FOODS_BY_CATEGORY_SUCCESS =
  '[foods] load foods by category success';

export const LOAD_FOOD_BY_ID = '[foods] load food by id';
export const LOAD_FOOD_BY_ID_SUCCESS = '[food] load food by id success';

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

export const loadFoodsByCategory = createAction(
  LOAD_FOODS_BY_CATEGORY,
  props<{ category: string }>()
);

export const loadFoodsByCategoryIdSuccess = createAction(
  LOAD_FOODS_BY_CATEGORY_SUCCESS,
  props<{ foods: { id: number; name: string; imageUrl: string }[] }>()
);

export const loadFoodById = createAction(
  LOAD_FOOD_BY_ID,
  props<{ id: number }>()
);

export const loadFoodByIdSuccess = createAction(
  LOAD_FOOD_BY_ID_SUCCESS,
  props<{ food: any }>()
);

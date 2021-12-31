import { createAction, props } from '@ngrx/store';
import {
  IFoodCategoryData,
  IFoodData,
  IFoodPreviewData,
} from '../interfaces/food.interface';

export const LOAD_CATEGORIES_ACTION = '[foods] load categories action';
export const LOAD_CATEGORIES_SUCCESS = '[foods] load categories success';
export const LOAD_CATEGORIES_FAILURE = '[foods] load categories failure';

export const LOAD_AUTOCOMPLETE_SEARCHED_FOOD_ACTION =
  '[foods] load autocomplete searched food action';
export const LOAD_AUTOCOMPLETE_SEARCHED_FOOD_SUCCESS =
  '[foods] load autocomplete searched food success';

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
  props<{ foodCategories: IFoodCategoryData[] }>()
);

export const loadAutocompleteSearchedFood = createAction(
  LOAD_AUTOCOMPLETE_SEARCHED_FOOD_ACTION,
  props<{ searchedFood: string }>()
);

export const loadAutocompleteSearchedFoodSuccess = createAction(
  LOAD_AUTOCOMPLETE_SEARCHED_FOOD_SUCCESS,
  props<{ foods: IFoodPreviewData[] }>()
);

// export const loadSearchedFood = createAction(

// )

export const loadFoodsByCategory = createAction(
  LOAD_FOODS_BY_CATEGORY,
  props<{ category: string }>()
);

export const loadFoodsByCategorySuccess = createAction(
  LOAD_FOODS_BY_CATEGORY_SUCCESS,
  props<{ foods: IFoodPreviewData[] }>()
);

export const loadFoodById = createAction(
  LOAD_FOOD_BY_ID,
  props<{ id: number }>()
);

export const loadFoodByIdSuccess = createAction(
  LOAD_FOOD_BY_ID_SUCCESS,
  props<{ food: IFoodData }>()
);

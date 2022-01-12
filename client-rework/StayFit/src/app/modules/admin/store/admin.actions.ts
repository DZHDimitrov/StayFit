import { createAction, props } from '@ngrx/store';

export const LOAD_READING_MAIN_CATEGORIES =
  '[admin] load reading main categories';
export const LOAD_READING_MAIN_CATEGORIES_SUCCESS =
  '[admin] load reading main categories success';

export const LOAD_READING_SUB_CATEGORIES =
  '[admin] load reading sub categories';

export const LOAD_READING_SUB_CATEGORIES_SUCCESS =
  '[admin] load reading sub categories success';

export const RESET_READING_SUB_CATEGORIES =
  '[admin] reset reading sub-categories';

export const ADD_READING = '[admin] add reading';
export const ADD_READING_SUCCESS = '[admin] add reading success';

export const LOAD_FOOD_CATEGORIES = '[admin] load food categories';
export const LOAD_FOOD_CATEGORIES_SUCCESS =
  '[admin] load food categories success';

export const LOAD_FOODS_BY_CATEGORY = '[admin] load foods by category';
export const LOAD_FOODS_BY_CATEGORY_SUCCESS =
  '[admin] load foods by category success';

export const LOAD_NUTRIENTS = '[admin] load nutrients';
export const LOAD_NUTRIENTS_SUCCESS = '[admin] load nutrients success';

export const SET_CHOSEN_NUTRIENTS = '[admin] set chosen nutrients';

export const loadReadingMainCategories = createAction(
  LOAD_READING_MAIN_CATEGORIES
);

export const loadReadingMainCategoriesSuccess = createAction(
  LOAD_READING_MAIN_CATEGORIES_SUCCESS,
  props<{ mainCategories: any }>()
);

export const loadReadingSubCategories = createAction(
  LOAD_READING_SUB_CATEGORIES,
  props<{ mainCategoryId: number }>()
);

export const loadReadingSubCategoriesSuccess = createAction(
  LOAD_READING_SUB_CATEGORIES_SUCCESS,
  props<{ subCategories: any[] }>()
);

export const resetReadingSubCategories = createAction(
  RESET_READING_SUB_CATEGORIES
);

export const addReading = createAction(ADD_READING, props<{ data: any }>());
export const addReadingSuccess = createAction(ADD_READING_SUCCESS);

export const loadFoodCategories = createAction(LOAD_FOOD_CATEGORIES);
export const loadFoodCategoriesSuccess = createAction(
  LOAD_FOOD_CATEGORIES_SUCCESS,
  props<{ categories: { id: number; name: string }[] }>()
);

export const loadFoodsByCategory = createAction(
  LOAD_FOODS_BY_CATEGORY,
  props<{ categoryName: string }>()
);

export const loadFoodsByCategorySuccess = createAction(
  LOAD_FOODS_BY_CATEGORY_SUCCESS,
  props<{ foods: any[] }>()
);

export const loadNutrients = createAction(LOAD_NUTRIENTS);

export const loadNutrientsSuccess = createAction(
  LOAD_NUTRIENTS_SUCCESS,
  props<{ nutrients: any[] }>()
);

export const setChosenNutrients = createAction(
  SET_CHOSEN_NUTRIENTS,
  props<{ nutrient: any }>()
);

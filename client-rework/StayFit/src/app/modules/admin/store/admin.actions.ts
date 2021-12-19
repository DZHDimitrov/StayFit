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

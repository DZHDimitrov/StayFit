import { createAction, props } from '@ngrx/store';
import { IInnerNavBar } from '../../../@components/interfaces/navbar.interface';
import {
  ReadingCategory,
  ReadingSubCategory,
} from '../../../@core/enums/reading.category';

export const LOAD_CATEGORIES_LATEST_PREVIEWS_ACTION =
  '[readings] load categories latest previews action';
export const LOAD_CATEGORIES_LATEST_PREVIEWS_SUCCESS =
  '[readings] load categories latest previews success';

export const LOAD_CONTENT_BY_MC = '[readings] load content by main category';
export const LOAD_CONTENT_BY_MC_SUCCESS =
  '[readings] load content by main category success';

export const LOAD_CONTENT_BY_SC = '[readings] load content by sub category';
export const LOAD_CONTENT_BY_SC_SUCCESS =
  '[readings] load content by sub category success';

export const LOAD_READING = '[readings] load reading';
export const LOAD_READING_SUCCESS = '[readings] load reading success';

export const LOAD_READING_MAIN_CATEGORIES =
  '[readings] load reading main categories';
export const LOAD_READING_MAIN_CATEGORIES_SUCCESS =
  '[readings] load reading main categories success';

export const LOAD_READING_SUB_CATEGORIES =
  '[readings] load reading sub categories';

export const LOAD_READING_SUB_CATEGORIES_SUCCESS =
  '[readings] load reading sub categories success';

export const RESET_READING_SUB_CATEGORIES =
  '[readings] reset reading sub-categories';

export const ADD_READING = '[readings] add reading';
export const ADD_READING_SUCCESS = '[readings] add reading success';

export const loadCategoriesLatestPreviews = createAction(
  LOAD_CATEGORIES_LATEST_PREVIEWS_ACTION
);
export const loadCategoriesLatestPreviewsSuccess = createAction(
  LOAD_CATEGORIES_LATEST_PREVIEWS_SUCCESS,
  props<{ navBar: IInnerNavBar; latestPreviews: any }>()
);

export const loadCatalogueByMainCategory = createAction(
  LOAD_CONTENT_BY_MC,
  props<{ category: ReadingCategory }>()
);

export const loadCatalogueByMainCategorySuccess = createAction(
  LOAD_CONTENT_BY_MC_SUCCESS,
  props<{
    navBar: IInnerNavBar;
    previews: any[];
    hasChildren?: boolean;
  }>()
);

export const loadCatalogueBySubCategory = createAction(
  LOAD_CONTENT_BY_SC,
  props<{ mainCategory: ReadingCategory; subCategory: ReadingSubCategory }>()
);

export const loadCatalogueBySubCategorySuccess = createAction(
  LOAD_CONTENT_BY_SC_SUCCESS,
  props<{ navBar: IInnerNavBar; previews: any[]; hasChildren?: boolean }>()
);

export const loadReadingById = createAction(
  LOAD_READING,
  props<{
    mainCategory: ReadingCategory | string;
    subCategory: ReadingSubCategory | string;
    id?: number;
  }>()
);

export const loadReadingByIdSuccess = createAction(
  LOAD_READING_SUCCESS,
  props<{ currentReading: any }>()
);

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

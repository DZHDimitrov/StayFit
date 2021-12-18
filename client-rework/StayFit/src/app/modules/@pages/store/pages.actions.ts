import { createAction, props } from '@ngrx/store';
import { IInnerNavBar } from '../../@components/interfaces/navbar.interface';
import {
  ReadingCategory,
  ReadingSubCategory,
} from '../../@core/enums/reading.category';

export const LOAD_CATEGORIES_LATEST_PREVIEWS_ACTION =
  '[pages] load categories latest previews action';
export const LOAD_CATEGORIES_LATEST_PREVIEWS_SUCCESS =
  '[pages] load categories latest previews success';

export const LOAD_CONTENT_BY_MC = '[pages] load content by main category';
export const LOAD_CONTENT_BY_MC_SUCCESS =
  '[pages] load content by main category success';

export const LOAD_CONTENT_BY_SC = '[pages] load content by sub category';
export const LOAD_CONTENT_BY_SC_SUCCESS =
  '[pages] load content by sub category success';

export const LOAD_READING = '[pages] load reading';
export const LOAD_READING_SUCCESS = '[pages] load reading success';

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
  props<{ mainCategory: ReadingCategory | string; subCategory: ReadingSubCategory | string; id?: number }>()
);

export const loadReadingByIdSuccess = createAction(
  LOAD_READING_SUCCESS,
  props<{currentReading:any}>()
)

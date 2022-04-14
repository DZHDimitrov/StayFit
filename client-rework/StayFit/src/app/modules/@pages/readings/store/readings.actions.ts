import { createHTTPActions } from 'src/app/modules/@core/utility/store-actions.helper';

import { IReadingCategory } from '../models/readings-category.model';

import { IKnowledge, IMainCategoryWithPreviews, ISubCategoryWithPreviews } from '../models/readings-previews.model';

import { IReading } from '../models/readings-reading.model';

export const [loadKnowledge, loadKnowledgeSuccess] =
createHTTPActions<{},{ knowledge: IKnowledge }>('[readings] load categories latest previews action');

export const [loadMainCategoryWithPreviews,loadMainCategoryWithPreviewsSuccess,loadMainCategoryWithPreviewsFailure] =
createHTTPActions<{ category: string }, { mainCategoryWithPreviews: IMainCategoryWithPreviews },{}>('[readings] load main category with previews');

export const [loadSubCategoryWithPreviews, loadSubCategoryWithPreviewsSuccess,loadSubCategoryWithPreviewsFailure] =
createHTTPActions<{ mainCategory: string; subCategory: string },{ subCategoryWithPreviews: ISubCategoryWithPreviews },{}>('[readings] load sub category with previews');

export const [loadReading, loadReadingSuccess] =
createHTTPActions<{ id: string },{ currentReading: IReading }>('[readings] load reading');

export const [loadReadingMainCategories, loadReadingMainCategoriesSuccess] =
createHTTPActions<{}, { categories: IReadingCategory[] }>('[readings] load reading main categories');

export const [loadReadingSubCategories, loadReadingSubCategoriesSuccess] =
createHTTPActions<{ mainId: number }, { categories: IReadingCategory[] }>('[readings] load reading sub categories');

export const [resetReadingSubCategories] =
createHTTPActions<{}, {}, {}>('[readings] reset sub-categories');

export const [addReading, addReadingSuccess] =
createHTTPActions<{ data: any },{}>('[readings] add reading');

import { createHTTPActions } from 'src/app/modules/@core/utility/store-actions.helper';

import { IReadingCategory } from '../models/readings-category.model';

import { IKnowledge, IMainCategoryWithPreviews, ISubCategoryWithPreviews } from '../models/readings-previews.model';

import { IReading, IReadingForEdit } from '../models/readings-reading.model';

export const [loadKnowledge, loadKnowledgeSuccess] =
createHTTPActions<{},{ knowledge: IKnowledge }>('[readings] load categories latest previews action');

export const [loadMainCategoryWithPreviews,loadMainCategoryWithPreviewsSuccess,loadMainCategoryWithPreviewsFailure] =
createHTTPActions<{ category: string }, { mainCategoryWithPreviews: IMainCategoryWithPreviews },{error?:string}>('[readings] load main category with previews');

export const [loadSubCategoryWithPreviews, loadSubCategoryWithPreviewsSuccess,loadSubCategoryWithPreviewsFailure] =
createHTTPActions<{ mainCategory: string; subCategory: string },{ subCategoryWithPreviews: ISubCategoryWithPreviews },{error?:string}>('[readings] load sub category with previews');

export const [loadReading, loadReadingSuccess,loadReadingFailure] =
createHTTPActions<{ id: string },{ currentReading: IReading },{error?:string}>('[readings] load reading');

export const [loadReadingForEdit,loadReadingForEditSuccess,loadReadingForEditFailure] =
createHTTPActions<{id:string},{currentReading:IReadingForEdit},{error?:string}>('[readings] load reading for edit');

export const [loadReadingMainCategories, loadReadingMainCategoriesSuccess] =
createHTTPActions<{}, { categories: IReadingCategory[] }>('[readings] load reading main categories');

export const [loadReadingSubCategories, loadReadingSubCategoriesSuccess] =
createHTTPActions<{ mainId: number }, { categories: IReadingCategory[] }>('[readings] load reading sub categories');

export const [resetReadingSubCategories] =
createHTTPActions<{}, {}, {}>('[readings] reset sub-categories');

export const [addReading, addReadingSuccess, addReadingFailure] =
createHTTPActions<{ data: any },{},{ error?:string }>('[readings] add reading');

export const [editReading, editReadingSuccess, editReadingFailure] =
createHTTPActions<{ readingId:number,data: any },{},{ error?:string }>('[readings] edit reading');

export const [deleteReading,deleteReadingSuccess,deleteReadingFailure] =
createHTTPActions<{ readingId:number },{},{ error?:string }>('[readings] delete reading');

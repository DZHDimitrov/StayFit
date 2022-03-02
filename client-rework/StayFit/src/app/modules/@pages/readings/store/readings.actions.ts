import { IReadingCategory } from 'src/app/modules/@core/interfaces/readings/readings-category.interface';
import { IKnowledge, IMainCategoryWithPreviews, ISubCategoryWithPreviews } from 'src/app/modules/@core/interfaces/readings/readings-previews.interface';
import { IReading } from 'src/app/modules/@core/interfaces/readings/readings-reading.interface';

import { createHTTPActions } from 'src/app/modules/@core/utility/store-actions.helper';

export const [loadKnowledge, loadKnowledgeSuccess] = createHTTPActions<
  {},
  { knowledge: IKnowledge }
>('[readings] load categories latest previews action');

export const [
  loadMainCategoryWithPreviews,
  loadMainCategoryWithPreviewsSuccess,
] = createHTTPActions<{ category: string }, { mainCategoryWithPreviews: IMainCategoryWithPreviews }>(
  '[readings] load main category with previews'
);

export const [loadSubCategoryWithPreviews, loadSubCategoryWithPreviewsSuccess] =
  createHTTPActions<
    { mainCategory: string; subCategory: string },
    { subCategoryWithPreviews: ISubCategoryWithPreviews }
  >('[readings] load sub category with previews');

export const [loadReading, loadReadingSuccess] = createHTTPActions<
  { mainCategory: string; subCategory: string; id?: string },
  { currentReading: IReading }
>('[readings] load reading');

export const [loadReadingMainCategories, loadReadingMainCategoriesSuccess] =
  createHTTPActions<{}, { categories: IReadingCategory[] }>(
    '[readings] load reading main categories'
  );

export const [loadReadingSubCategories, loadReadingSubCategoriesSuccess] =
  createHTTPActions<{ mainId: number }, { categories: IReadingCategory[] }>(
    '[readings] load reading sub categories'
  );

export const [resetReadingSubCategories] = createHTTPActions<{}, {}, {}>(
  '[readings] reset sub-categories'
);

export const [addReading, addReadingSuccess] = createHTTPActions<
  { data: any },
  {}
>('[readings] add reading');

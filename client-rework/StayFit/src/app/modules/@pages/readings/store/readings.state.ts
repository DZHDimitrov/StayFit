import { IReadingCategory } from 'src/app/modules/@core/interfaces/readings/readings-category.interface';

import {IKnowledge, IMainCategoryWithPreviews, ISubCategoryWithPreviews } from 'src/app/modules/@core/interfaces/readings/readings-previews.interface';

import { IReading } from 'src/app/modules/@core/interfaces/readings/readings-reading.interface';

export interface IReadingsState {
  knowledge: IKnowledge | null;

  mainCategories: IReadingCategory[];

  subCategories: IReadingCategory[];

  mainCategoryWithPreviews:IMainCategoryWithPreviews | null,

  subCategoryWithPreviews:ISubCategoryWithPreviews | null,

  currentReading: IReading | null;
}

export const initialState: IReadingsState = {
  knowledge: null,

  mainCategoryWithPreviews: null,

  subCategoryWithPreviews: null,

  mainCategories:[],

  subCategories:[],

  currentReading: null,
};

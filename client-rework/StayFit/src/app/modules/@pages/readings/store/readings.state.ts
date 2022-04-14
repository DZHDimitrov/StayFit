import { IReadingCategory } from "../models/readings-category.model";

import { IKnowledge, IMainCategoryWithPreviews, ISubCategoryWithPreviews } from "../models/readings-previews.model";

import { IReading } from "../models/readings-reading.model";

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

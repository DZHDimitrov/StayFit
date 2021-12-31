import {
  IFood,
  IFoodCategory,
  IFoodPreview,
} from 'src/app/modules/@core/interfaces/responses/foods/foods.res';

export interface IFoodCategoryData extends IFoodCategory {
  searchName: string;
}

export interface IFoodPreviewData extends IFoodPreview {
  searchName?: string;
}

export interface IFoodData extends IFood {
  coreNutrients: { name: string; quantity: any }[];
}

import {
  IFoodCategoryData,
  IFoodData,
  IFoodPreviewData,
} from '../interfaces/food.interface';

export interface IFoodsState {
  foodsCategories: IFoodCategoryData[];
  autocompleteKeywords: IFoodPreviewData[];
  foodsByCategory: IFoodPreviewData[];
  searchedFood:IFoodPreviewData[];
  foodDetails: IFoodData | {};
}

export const initialState: IFoodsState = {
  foodsCategories: [],
  autocompleteKeywords: [],
  foodsByCategory: [],
  searchedFood: [],
  foodDetails: {},
};

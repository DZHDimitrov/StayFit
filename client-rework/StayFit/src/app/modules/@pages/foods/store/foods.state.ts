import {
  IFoodCategoryData,
  IFoodData,
  IFoodPreviewData,
} from '../interfaces/food.interface';

export interface IFoodsState {
  foodsCategories: IFoodCategoryData[];
  searchedFood: IFoodPreviewData[];
  foodsByCategory: IFoodPreviewData[];
  foodDetails: IFoodData | {};
}

export const initialState: IFoodsState = {
  foodsCategories: [],
  searchedFood: [],
  foodsByCategory: [],
  foodDetails: {},
};

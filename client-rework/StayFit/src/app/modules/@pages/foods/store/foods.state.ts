import {
  FoodDetailsMode,
  IFoodCategoryData,
  IFoodData,
  IFoodPreviewData,
} from '../interfaces/food.interface';

export interface IFoodsState {
  foodsCategories: IFoodCategoryData[];
  autocompleteKeywords: IFoodPreviewData[];
  foodsByCategory: IFoodPreviewData[];
  searchedFood:IFoodPreviewData[];
  foodDetails: IFoodData | any;
  categories: { id: number; name: string }[];
  byCategory: any[];
  nutrients: any[];
  chosenNutrients: any;
}

export const initialState: IFoodsState = {
  foodsCategories: [],
  autocompleteKeywords: [],
  foodsByCategory: [],
  searchedFood: [],
  foodDetails: {mode:FoodDetailsMode.VIEW},
  byCategory:[],
  categories:[],
  chosenNutrients:[],
  nutrients:[]
};

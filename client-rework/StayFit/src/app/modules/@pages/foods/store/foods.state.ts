import { IFoodCategory } from 'src/app/modules/@core/interfaces/foods/foods-category.interface';

import { FoodDetailsMode, IFood, IFoodPreview } from 'src/app/modules/@core/interfaces/foods/foods-food.interface';

import { IFoodKeyword } from 'src/app/modules/@core/interfaces/foods/foods-keywords.interface';

export interface IFoodsState {

  foodsCategories: IFoodCategory[];

  foodsByCategory: IFoodPreview[];
  
  searchKeywords: IFoodKeyword[];

  searchedFood: IFoodPreview[];
  
  foodDetails: IFood | any;

  foodTypesByCategory: any[];
  
  editMode: FoodDetailsMode,
}

export const initialState: IFoodsState = {
  foodsCategories: [],

  editMode: FoodDetailsMode.VIEW,

  searchKeywords: [],

  foodsByCategory: [],

  searchedFood: [],

  foodDetails: {},

  foodTypesByCategory: [],
};

import { IFoodCategory } from '../models/foods-category.model';

import {
  FoodDetailsMode,
  IFood,
  IFoodPreview,
} from '../models/foods-food.model';

export interface IFoodsState {
  foodsCategories: IFoodCategory[];

  foodsByCategory: IFoodPreview[];

  searchedFood: IFoodPreview[];

  foodDetails: IFood | any;

  foodTypesByCategory: any[];

  editMode: FoodDetailsMode;
}

export const initialState: IFoodsState = {
  foodsCategories: [],

  editMode: FoodDetailsMode.VIEW,

  foodsByCategory: [],

  searchedFood: [],

  foodDetails: {},

  foodTypesByCategory: [],
};

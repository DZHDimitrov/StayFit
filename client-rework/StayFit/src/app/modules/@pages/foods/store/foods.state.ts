import { IFoodCategory } from 'src/app/modules/@core/interfaces/responses/foods/foods.res';

export interface IFoodsState {
  foodsCategories: IFoodCategory[];
  searchedFood: any[];
  foodsByCategory: any[];
  foodDetails: any;
}

export const initialState: IFoodsState = {
  foodsCategories: [],
  searchedFood: [],
  foodsByCategory: [],
  foodDetails: {},
};

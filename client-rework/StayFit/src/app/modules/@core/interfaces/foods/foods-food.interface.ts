import { INutrient } from "./foods-nutrients.interface";

export interface IFood {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  calories: number;
  nutrients: INutrient[];
}

export interface IFoodPreview {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  foodNameId?: number;
  category?: string;
}

export enum FoodDetailsMode {
  EDIT = 'edit',
  VIEW = 'view'
}
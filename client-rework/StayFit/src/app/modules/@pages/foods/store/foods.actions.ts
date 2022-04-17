;import { createHTTPActions } from 'src/app/modules/@core/utility/store-actions.helper';

import { IFoodCategory } from '../models/foods-category.model';

import { FoodDetailsMode, IFood, IFoodPreview } from '../models/foods-food.model';

import { IAddFoodRequest, IEditFoodRequest } from '../models/foods-request';

import { IFoodType } from '../models/foods-types.model';

export const [loadFoodsCategories, loadFoodsCategoriesSuccess] =
createHTTPActions<{}, { foodCategories: IFoodCategory[] }>('[foods] load categories');

export const [loadSearchedFood, loadSearchedFoodSuccess] =
createHTTPActions<{ text: string },{ foods: any }>('[foods] load searched food');

export const [loadFoodsByCategory, loadFoodsByCategorySuccess] =
createHTTPActions<{ category: string }, { foods: IFoodPreview[] }>('[foods] load foods by category');

export const [loadFoodById, loadFoodByIdSuccess,loadFoodByIdFailure] = 
createHTTPActions<{ id: number },{ food: any },{error?:string}>('[foods] load food by id');

export const [loadFoodCategories, loadFoodCategoriesSuccess] =
createHTTPActions<{}, { categories: Partial<IFoodCategory>[] }>('[foods] load food categories');

export const [loadFoodTypesByCategoryId, loadFoodTypesByCategoryIdSuccess] =
createHTTPActions<{ categoryId: number }, { foodTypes: IFoodType[] }>('[foods] load food types by category');

export const [setFoodDetailsMode] =
createHTTPActions<{mode:FoodDetailsMode}>('[foods] set food details mode');

export const [editFoodById, editFoodByIdSuccess,editFoodByIdFailure] =
createHTTPActions<{ foodId: number; data: IEditFoodRequest },{ foodId: number; data: IFood },{error?:string}>('[foods] edit food by id');

export const [addFood, addFoodSuccess, addFoodFailure] = 
createHTTPActions<{ data: IAddFoodRequest },{},{error?:string}>('[foods] add food');

export const [deleteFood,deleteFoodSuccess, deleteFoodFailure] =
createHTTPActions<{foodId:string},{foodId:string},{error?:string}>('[foods] delete food by id');

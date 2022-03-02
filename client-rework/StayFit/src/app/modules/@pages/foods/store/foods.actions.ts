import { IAddFood, IEditFood } from 'src/app/modules/@core/interfaces/requests/foods.req';

import { IFoodCategory } from 'src/app/modules/@core/interfaces/foods/foods-category.interface';

import { FoodDetailsMode, IFoodPreview } from 'src/app/modules/@core/interfaces/foods/foods-food.interface';

import { IFoodKeyword } from 'src/app/modules/@core/interfaces/foods/foods-keywords.interface';

import { IFoodType } from 'src/app/modules/@core/interfaces/foods/foods-types.interface';

import { createHTTPActions } from 'src/app/modules/@core/utility/store-actions.helper';

export const [loadFoodsCategories, loadFoodsCategoriesSuccess] =
createHTTPActions<{}, { foodCategories: IFoodCategory[] }>('[foods] load categories');

export const [loadAutocompleteKeywords, loadAutocompleteKeywordsSuccess] =
createHTTPActions<{ searchedFood: string }, { foods: IFoodKeyword[] }>('[foods] load autocomplete keywords');

export const [loadSearchedFood, loadSearchedFoodSuccess] =
createHTTPActions<{ text: string },{ foods: any }>('[foods] load searched food');

export const [loadFoodsByCategory, loadFoodsByCategorySuccess] =
createHTTPActions<{ category: string }, { foods: IFoodPreview[] }>('[foods] load foods by category');

export const [loadFoodById, loadFoodByIdSuccess] = 
createHTTPActions<{ id: number },{ food: any }>('[foods] load food by id');

export const [loadFoodCategories, loadFoodCategoriesSuccess] =
createHTTPActions<{}, { categories: Partial<IFoodCategory>[] }>('[foods] load food categories');

export const [loadFoodTypesByCategoryId, loadFoodTypesByCategoryIdSuccess] =
createHTTPActions<{ categoryId: number }, { foodTypes: IFoodType[] }>('[foods] load food types by category');

export const [setFoodDetailsMode] =
createHTTPActions<{mode:FoodDetailsMode}>('[foods] set food details mode');

export const [editFoodById, editFoodByIdSuccess] =
createHTTPActions<{ foodId: number; data: IEditFood },{ foodId: number; data: IEditFood }>('[foods] edit food by id');

export const [addFood, addFoodSuccess, addFoodFailure] = 
createHTTPActions<{ data: IAddFood },{},{}>('[foods] add food');

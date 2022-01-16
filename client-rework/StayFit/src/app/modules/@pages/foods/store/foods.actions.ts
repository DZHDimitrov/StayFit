import { createAction, props } from '@ngrx/store';
import {
  FoodDetailsMode,
  IFoodCategoryData,
  IFoodData,
  IFoodPreviewData,
} from '../interfaces/food.interface';

export const LOAD_CATEGORIES_ACTION = '[foods] load categories action';
export const LOAD_CATEGORIES_SUCCESS = '[foods] load categories success';
export const LOAD_CATEGORIES_FAILURE = '[foods] load categories failure';

export const LOAD_AUTOCOMPLETE_KEYWORDS_ACTION =
  '[foods] load autocomplete keywords action';
export const LOAD_AUTOCOMPLETE_KEYWORDS_SUCCESS =
  '[foods] load autocomplete keywords success';

export const LOAD_SEARCHED_FOOD_ACTION = '[foods] load searched food action';
export const LOAD_SEARCHED_FOOD_SUCCESS = '[foods] load searched food success';

export const LOAD_FOODS_BY_CATEGORY = '[foods] load foods by category';
export const LOAD_FOODS_BY_CATEGORY_SUCCESS =
  '[foods] load foods by category success';

export const LOAD_FOOD_BY_ID = '[foods] load food by id';
export const LOAD_FOOD_BY_ID_SUCCESS = '[food] load food by id success';

export const LOAD_FOOD_CATEGORIES = '[foods] load food categories';
export const LOAD_FOOD_CATEGORIES_SUCCESS =
  '[foods] load food categories success';

export const LOAD_FOOD_TYPES_BY_CATEGORY = '[foods] load food types by category';
export const LOAD_FOOD_TYPES_BY_CATEGORY_SUCCESS =
  '[foods] load food types by category success';

export const LOAD_NUTRIENTS = '[foods] load nutrients';
export const LOAD_NUTRIENTS_SUCCESS = '[foods] load nutrients success';

export const SET_CHOSEN_NUTRIENTS = '[foods] set chosen nutrients';

export const SET_FOOD_DETAILS_MODE = '[foods] set food details mode';


export const loadFoodsCategories = createAction(LOAD_CATEGORIES_ACTION);
export const loadFoodsCategoriesSuccess = createAction(
  LOAD_CATEGORIES_SUCCESS,
  props<{ foodCategories: IFoodCategoryData[] }>()
);

export const loadAutocompleteKeywords = createAction(
  LOAD_AUTOCOMPLETE_KEYWORDS_ACTION,
  props<{ searchedFood: string }>()
);

export const loadAutocompleteKeywordsSuccess = createAction(
  LOAD_AUTOCOMPLETE_KEYWORDS_SUCCESS,
  props<{ foods: IFoodPreviewData[] }>()
);

export const loadSearchedFood = createAction(
  LOAD_SEARCHED_FOOD_ACTION,
  props<{ text: string }>()
);

export const loadSearchedFoodSuccess = createAction(
  LOAD_SEARCHED_FOOD_SUCCESS,
  props<{foods:any}>()
)

export const loadFoodsByCategory = createAction(
  LOAD_FOODS_BY_CATEGORY,
  props<{ category: string }>()
);

export const loadFoodsByCategorySuccess = createAction(
  LOAD_FOODS_BY_CATEGORY_SUCCESS,
  props<{ foods: IFoodPreviewData[] }>()
);

export const loadFoodById = createAction(
  LOAD_FOOD_BY_ID,
  props<{ id: number }>()
);

export const loadFoodByIdSuccess = createAction(
  LOAD_FOOD_BY_ID_SUCCESS,
  props<{ food: IFoodData }>()
);

export const loadFoodCategories = createAction(LOAD_FOOD_CATEGORIES);
export const loadFoodCategoriesSuccess = createAction(
  LOAD_FOOD_CATEGORIES_SUCCESS,
  props<{ categories: { id: number; name: string }[] }>()
);

export const loadFoodTypesByCategoryId = createAction(
  LOAD_FOOD_TYPES_BY_CATEGORY,
  props<{categoryId:number}>()
)

export const loadFoodTypesByCategoryIdSuccess = createAction(
  LOAD_FOOD_TYPES_BY_CATEGORY_SUCCESS,
  props<{foods:any[]}>()
)

export const loadNutrients = createAction(LOAD_NUTRIENTS);

export const loadNutrientsSuccess = createAction(
  LOAD_NUTRIENTS_SUCCESS,
  props<{ nutrients: any[] }>()
);

export const setChosenNutrients = createAction(
  SET_CHOSEN_NUTRIENTS,
  props<{ nutrient: any }>()
);

export const setFoodDetailsMode = createAction(
  SET_FOOD_DETAILS_MODE,
  props<{mode:FoodDetailsMode}>()
)


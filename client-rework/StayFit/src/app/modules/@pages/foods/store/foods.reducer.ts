import { createReducer, on } from '@ngrx/store';
import {
  loadFoodByIdSuccess,
  loadFoodsByCategorySuccess,
  loadFoodsCategoriesSuccess,
  loadAutocompleteKeywordsSuccess,
  loadSearchedFoodSuccess,
  loadFoodCategoriesSuccess,
  setChosenNutrients,
  loadNutrientsSuccess,
  loadFoodTypesByCategoryIdSuccess,
  setFoodDetailsMode,
} from './foods.actions';
import { initialState } from './foods.state';

export const _foodsReducer = createReducer(
  initialState,
  on(loadFoodsCategoriesSuccess, (state, action) => {
    return {
      ...state,
      foodsCategories: action.foodCategories,
    };
  }),
  on(loadAutocompleteKeywordsSuccess, (state, action) => {
    return {
      ...state,
      autocompleteKeywords: action.foods,
    };
  }),
  on(loadFoodsByCategorySuccess, (state, action) => {
    return {
      ...state,
      foodsByCategory: action.foods,
    };
  }),
  on(loadFoodByIdSuccess, (state, action) => {
    return {
      ...state,
      foodDetails: action.food,
    };
  }),
  on(loadSearchedFoodSuccess, (state, action) => {
    return {
      ...state,
      searchedFood: action.foods,
    };
  }),
  on(loadFoodCategoriesSuccess, (state, action) => {
    return {
      ...state,
      categories: action.categories,
    };
  }),
  on(loadFoodTypesByCategoryIdSuccess, (state, action) => {
    return {
      ...state,
      byCategory: action.foods,
    };
  }),
  on(loadNutrientsSuccess, (state, action) => {
    return {
      ...state,
      nutrients: [
        ...JSON.parse(JSON.stringify(action.nutrients))
          .filter((x) => x.name !== 'Още')
          .sort((a, b) => a.name.localeCompare(b.name)),
        action.nutrients[action.nutrients.length - 1],
      ],
    };
  }),
  on(setChosenNutrients, (state, action) => {
    let chosenNutrients: any[] = [];
    const group = state.chosenNutrients.find(
      (n) => n.id === action.nutrient.id
    );
    if (group) {
      if (
        group.subNutrients.some((sn) => sn.id === action.nutrient.subNutrientId)
      ) {
        chosenNutrients = state.chosenNutrients.filter(
          (n) => n.id !== action.nutrient.id
        );
        const subNutrients = group.subNutrients.filter(
          (sn) => sn.id !== action.nutrient.subNutrientId
        );
        if (subNutrients.length > 0) {
          chosenNutrients.push({
            id: action.nutrient.id,
            name: action.nutrient.name,
            subNutrients,
          });
        }
      } else {
        chosenNutrients = state.chosenNutrients.filter(
          (n) => n.id !== action.nutrient.id
        );
        const subNutrients = JSON.parse(JSON.stringify(group.subNutrients));
        subNutrients.push({
          id: action.nutrient.subNutrientId,
          name: action.nutrient.subNutrientName,
        });
        chosenNutrients.push({
          id: action.nutrient.id,
          name: action.nutrient.name,
          subNutrients,
        });
      }
    } else {
      chosenNutrients = JSON.parse(JSON.stringify(state.chosenNutrients));
      chosenNutrients.push({
        id: action.nutrient.id,
        name: action.nutrient.name,
        subNutrients: [{ id: action.nutrient.subNutrientId }],
      });
    }
    chosenNutrients.sort((a, b) => a.name.localeCompare(b.name));
    return {
      ...state,
      chosenNutrients,
    };
  }),
  on(setFoodDetailsMode,(state,action) => {
    return {
      ...state,
      foodDetails: {
        ...state.foodDetails,
        mode: action.mode
      }
    }
  })
);

export function FoodsReducer(state, action) {
  return _foodsReducer(state, action);
}

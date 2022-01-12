import { createReducer, on } from '@ngrx/store';
import {
  loadFoodsByCategorySuccess,
  loadFoodCategoriesSuccess,
  loadReadingMainCategoriesSuccess,
  loadReadingSubCategoriesSuccess,
  resetReadingSubCategories,
  loadNutrientsSuccess,
  setChosenNutrients,
} from './admin.actions';
import { InitialState } from './admin.state';

export const _adminReducer = createReducer(
  InitialState,
  on(loadReadingMainCategoriesSuccess, (state, action) => {
    return {
      ...state,
      mainCategories: action.mainCategories,
    };
  }),
  on(loadReadingSubCategoriesSuccess, (state, action) => {
    return {
      ...state,
      subCategories: action.subCategories,
    };
  }),
  on(resetReadingSubCategories, (state, action) => {
    return {
      ...state,
      subCategories: [],
    };
  }),
  on(loadFoodCategoriesSuccess, (state, action) => {
    return {
      ...state,
      food: {
        ...state.food,
        categories: action.categories,
      },
    };
  }),
  on(loadFoodsByCategorySuccess, (state, action) => {
    return {
      ...state,
      food: {
        ...state.food,
        byCategory: action.foods,
      },
    };
  }),
  on(loadNutrientsSuccess, (state, action) => {
    return {
      ...state,
      food: {
        ...state.food,
        nutrients: [
          ...JSON.parse(JSON.stringify(action.nutrients))
            .filter((x) => x.name !== 'Още')
            .sort((a, b) => a.name.localeCompare(b.name)),
          action.nutrients[action.nutrients.length - 1],
        ],
      },
    };
  }),
  on(setChosenNutrients, (state, action) => {
    let chosenNutrients: any[] = [];
    const group = state.food.chosenNutrients.find(
      (n) => n.id === action.nutrient.id
    );
    if (group) {
      if (
        group.subNutrients.some((sn) => sn.id === action.nutrient.subNutrientId)
      ) {
        chosenNutrients = state.food.chosenNutrients.filter(
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
        chosenNutrients = state.food.chosenNutrients.filter(
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
      chosenNutrients = JSON.parse(JSON.stringify(state.food.chosenNutrients));
      chosenNutrients.push({
        id: action.nutrient.id,
        name: action.nutrient.name,
        subNutrients: [{ id: action.nutrient.subNutrientId }],
      });
    }
    chosenNutrients.sort((a, b) => a.name.localeCompare(b.name));
    return {
      ...state,
      food: {
        ...state.food,
        chosenNutrients,
      },
    };
  })
);

export const AdminReducer = function (state, action) {
  return _adminReducer(state, action);
};

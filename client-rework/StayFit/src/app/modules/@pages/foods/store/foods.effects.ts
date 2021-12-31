import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { FoodsService } from 'src/app/modules/@core/backend/services/foods.service';
import { cyrillicToLatin } from 'src/app/modules/@core/utility/text-transilerator';
import { IFoodData } from '../interfaces/food.interface';
import {
  loadFoodById,
  loadFoodByIdSuccess,
  loadFoodsByCategory,
  loadFoodsByCategorySuccess,
  loadFoodsCategories,
  loadFoodsCategoriesSuccess,
  loadAutocompleteSearchedFood,
  loadAutocompleteSearchedFoodSuccess,
} from './foods.actions';

@Injectable()
export class FoodsEffects {
  constructor(private actions$: Actions, private service: FoodsService) {}

  loadCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFoodsCategories),
      switchMap((action) => {
        return this.service.listCategories().pipe(
          map((res) => {
            return loadFoodsCategoriesSuccess({
              foodCategories: res.data.map((category) => {
                return {
                  ...category,
                  searchName: category.name
                    .split(' ')
                    .map((word) => {
                      return cyrillicToLatin(word.toLowerCase());
                    })
                    .join('-'),
                };
              }),
            });
          })
        );
      })
    );
  });

  loadSearchedFood$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadAutocompleteSearchedFood),
      switchMap((action) => {
        return this.service.listSearchedFood(action.searchedFood).pipe(
          map((res) => {
            return loadAutocompleteSearchedFoodSuccess({
              foods: res.data?.map((food) => {
                return {
                  id: food.id,
                  name: food.name,
                  foodNameId: food.foodNameId,
                  searchName: [
                    food.category?.split(' ')[0].toLowerCase(),
                    '-',
                    food.name.toLocaleLowerCase(),
                    '-',
                    food.description?.toLowerCase(),
                  ].join(' '),
                };
              }),
            });
          })
        );
      })
    );
  });

  loadFoodByCategoryId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFoodsByCategory),
      switchMap((action) => {
        return this.service.listFoodsByCategory(action.category).pipe(
          map((res) => {
            return loadFoodsByCategorySuccess({ foods: res.data });
          })
        );
      })
    );
  });

  loadFoodById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFoodById),
      switchMap((action) => {
        return this.service.loadFoodById(action.id).pipe(
          map((res) => {
            const food:IFoodData = {
              ...res.data,
              coreNutrients: res.data.nutrients
                .filter(
                  (nutrient) =>
                    nutrient.name == 'Въглехидрати' ||
                    nutrient.name == 'Мазнини' ||
                    nutrient.name == 'Протеин'
                )
                .map((nutrient) => {
                  return {
                    name: nutrient.name,
                    quantity: nutrient.quantity?.toFixed(2) ?? '0.00',
                  };
                }),
              nutrients: res.data.nutrients
                .filter((nutrient) => nutrient.name !== 'Протеин')
                .map((nutrient) => {
                  return {
                    ...nutrient,
                    subNutrients: nutrient.subNutrients.map((subNutrient) => {
                      return {
                        ...subNutrient,
                        quantity: subNutrient.quantity ?? 'Няма данни',
                      };
                    }),
                  };
                }),
            };
            return loadFoodByIdSuccess({ food });
          })
        );
      })
    );
  });
}

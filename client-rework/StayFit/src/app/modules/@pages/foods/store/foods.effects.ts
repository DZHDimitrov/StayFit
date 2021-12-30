import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { FoodsService } from 'src/app/modules/@core/backend/services/foods.service';
import { cyrillicToLatin } from 'src/app/modules/@core/utility/text-transilerator';
import {
  loadFoodById,
  loadFoodByIdSuccess,
  loadFoodsByCategory,
  loadFoodsByCategoryIdSuccess,
  loadFoodsCategories,
  loadFoodsCategoriesSuccess,
  loadSearchedFood,
  loadSearchedFoodSuccess,
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
      ofType(loadSearchedFood),
      switchMap((action) => {
        return this.service.listSearchedFood(action.searchedFood).pipe(
          map((res) => {
            return loadSearchedFoodSuccess({
              foods: res.data?.map((food) => {
                return {
                  id: food.id,
                  foodNameId: food.foodNameId,
                  searchName: [
                    food.category.split(' ')[0].toLowerCase(),
                    '-',
                    food.name.toLocaleLowerCase(),
                    '-',
                    food.description.toLowerCase(),
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
        return this.service.listFoodByCategory(action.category).pipe(
          map((res) => {
            return loadFoodsByCategoryIdSuccess({ foods: res.data });
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
            const food = {
              ...res.data,
              coreNutrients: res.data.nutrientModels
                .filter(
                  (model) =>
                    model.baseNutrientName == 'Въглехидрати' ||
                    model.baseNutrientName == 'Мазнини' ||
                    model.baseNutrientName == 'Протеин'
                )
                .map((model) => {
                  return {
                    name: model.baseNutrientName,
                    quantity: model.quantity,
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

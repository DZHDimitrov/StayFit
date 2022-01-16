import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { FoodsService } from 'src/app/modules/@core/backend/services/foods.service';
import { cyrillicToLatin } from 'src/app/modules/@core/utility/text-transilerator';
import { IFoodData } from '../interfaces/food.interface';
import {
  loadFoodById,
  loadFoodByIdSuccess,
  loadFoodsByCategorySuccess,
  loadFoodsCategories,
  loadFoodsCategoriesSuccess,
  loadAutocompleteKeywords,
  loadAutocompleteKeywordsSuccess,
  loadSearchedFood,
  loadSearchedFoodSuccess,
  loadFoodsByCategory,
  loadFoodTypesByCategoryId,
  loadFoodTypesByCategoryIdSuccess,
  loadNutrients,
  loadNutrientsSuccess,
  loadFoodCategories,
  loadFoodCategoriesSuccess,
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

  loadAutocompleteKeywords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadAutocompleteKeywords),
      switchMap((action) => {
        return this.service.listAutocompleteKeywords(action.searchedFood).pipe(
          map((res) => {
            return loadAutocompleteKeywordsSuccess({
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

  loadFoodByCategory$ = createEffect(() => {
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
            const food: IFoodData = {
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
                    id: nutrient.id,
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

  loadSearchedFood$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSearchedFood),
      switchMap((action) => {
        return this.service.search(action.text).pipe(
          map((res) => {
            return loadSearchedFoodSuccess({
              foods: res.data.map((p) => {
                return {
                  ...p,
                  name: p.category.split(' ')[0] + ' ' + p.name.toLowerCase(),
                };
              }),
            });
          })
        );
      })
    );
  });

  loadFoodTypesByCategoryId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFoodTypesByCategoryId),
      switchMap((action) => {
        return this.service.listFoodNamesByCategoryId(action.categoryId).pipe(
          map((res) => {
            return loadFoodTypesByCategoryIdSuccess({ foods: res.data });
          })
        );
      })
    );
  });

  loadNutrients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNutrients),
      switchMap((action) => {
        return this.service.listNutrients().pipe(
          map((res) => {
            console.log(res);
            return loadNutrientsSuccess({
              nutrients: res.data
                .filter((n) => n.name !== 'Протеин')
                .map((n) => {
                  return {
                    id: n.id,
                    name: n.name,
                    subNutrients: n.subNutrients.map((sn) => {
                      return {
                        id: sn.id,
                        name: sn.name,
                      };
                    }),
                  };
                }),
            });
          })
        );
      })
    );
  });
    loadFoodCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFoodCategories),
      switchMap((action) => {
        console.log('asdasdasd')
        return this.service.listCategories().pipe(
          map((res) => {
            return loadFoodCategoriesSuccess({
              categories: res.data.map((c) => {
                return {
                  id: c.id,
                  name: c.name,
                };
              }),
            });
          })
        );
      })
    );
  });
}

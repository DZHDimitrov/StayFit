import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import {
  exhaustMap,
  map,
  skip,
  switchMap,
  take,
  takeLast,
  tap,
} from 'rxjs/operators';
import { IAppState } from 'src/app/state/app.state';
import { FoodsService } from '../../@core/backend/services/foods.service';
import { ReadingsService } from '../../@core/backend/services/readings.service';
import {
  addReading,
  addReadingSuccess,
  loadFoodsByCategory,
  loadFoodsByCategorySuccess,
  loadFoodCategories,
  loadFoodCategoriesSuccess,
  loadReadingMainCategories,
  loadReadingMainCategoriesSuccess,
  loadReadingSubCategories,
  loadReadingSubCategoriesSuccess,
  loadNutrients,
  loadNutrientsSuccess,
} from './admin.actions';

@Injectable()
export class AdminEffects {
  constructor(
    private actions$: Actions,
    private readingService: ReadingsService,
    private foodService: FoodsService,
    private store: Store<IAppState>,
    private toastr: ToastrService
  ) {}

  loadMainCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadReadingMainCategories),
      switchMap((action) => {
        return this.readingService.loadMainCategories().pipe(
          map((x) => {
            return loadReadingMainCategoriesSuccess({ mainCategories: x.data });
          })
        );
      })
    );
  });

  loadSubCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadReadingSubCategories),
      switchMap((action) => {
        return this.readingService
          .loadSubCategories(action.mainCategoryId)
          .pipe(
            map((x) => {
              return loadReadingSubCategoriesSuccess({ subCategories: x.data });
            })
          );
      })
    );
  });

  addReading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addReading),
      exhaustMap((action) => {
        return this.readingService.add(action.data).pipe(
          map((x) => {
            return addReadingSuccess();
          })
        );
      })
    );
  });

  addReadingSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(addReadingSuccess),
        tap((action) => {
          this.toastr.success('Успешно добавяне на четиво', 'Success');
        })
      );
    },
    { dispatch: false }
  );

  loadFoodCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFoodCategories),
      switchMap((action) => {
        return this.foodService.listCategories().pipe(
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

  loadFoodsByCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFoodsByCategory),
      switchMap((action) => {
        return this.foodService.listFoodsByCategory(action.categoryName).pipe(
          map((res) => {
            return loadFoodsByCategorySuccess({ foods: res.data });
          })
        );
      })
    );
  });

  loadNutrients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadNutrients),
      switchMap((action) => {
        return this.foodService.listNutrients().pipe(
          map((res) => {
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
}

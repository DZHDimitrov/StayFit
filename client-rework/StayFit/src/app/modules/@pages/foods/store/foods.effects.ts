import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { FoodsService } from 'src/app/modules/@core/backend/services/foods.service';

import { FoodDetailsMode } from 'src/app/modules/@core/interfaces/foods/foods-food.interface';

import { IAppState } from 'src/app/state/app.state';

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
  editFoodById,
  editFoodByIdSuccess,
  setFoodDetailsMode,
  addFood,
  addFoodSuccess,
  editFoodByIdFailure,
} from './foods.actions';

@Injectable()
export class FoodsEffects {
  constructor(
    private actions$: Actions,
    private service: FoodsService,
    private store: Store<IAppState>,
    private toastr: ToastrService
  ) {}

  loadCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFoodsCategories),
      switchMap((action) => {
        return this.service.loadCategories().pipe(
          map((res) => {
            return loadFoodsCategoriesSuccess({ foodCategories: res.data });
          })
        );
      })
    );
  });

  loadAutocompleteKeywords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadAutocompleteKeywords),
      switchMap(({ payload }) => {
        return this.service.loadAutocompleteKeywords(payload.searchedFood).pipe(
          map((res) => {
            return loadAutocompleteKeywordsSuccess({
              foods: res.data,
            });
          })
        );
      })
    );
  });

  loadFoodByCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFoodsByCategory),
      switchMap(({ payload }) => {
        return this.service.loadFoodsByCategory(payload.category).pipe(
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
      switchMap(({ payload }) => {
        return this.service.loadFoodById(payload.id).pipe(
          map((res) => {
            return loadFoodByIdSuccess({ food: res.data });
          })
        );
      })
    );
  });

  loadSearchedFood$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSearchedFood),
      switchMap(({ payload }) => {
        return this.service.search(payload.text).pipe(
          map((res) => {
            return loadSearchedFoodSuccess({
              foods: res.data,
            });
          })
        );
      })
    );
  });

  loadFoodTypesByCategoryId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFoodTypesByCategoryId),
      switchMap(({ payload }) => {
        return this.service.loadFoodTypesByCategoryId(payload.categoryId).pipe(
          map((res) => {
            return loadFoodTypesByCategoryIdSuccess({ foodTypes: res.data });
          })
        );
      })
    );
  });

  editFoodById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editFoodById),
      switchMap(({ payload }) => {
        return this.service.edit(payload.foodId, payload.data).pipe(
          map((res) => {
            if(res.isOk) {
              this.toastr.success('Успешно обновихте данните храната','Success')
              return editFoodByIdSuccess({
                foodId: payload.foodId,
                data: res.data.food,
              });
            }
            return editFoodByIdFailure({error:res.Errors[0].Error});
          }),
          catchError((err) => {
            return of(editFoodByIdFailure({error:err.error.error}));
          }),
         
        );
      })
    );
  });

  editFoodByIdFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editFoodByIdFailure),
      tap(({payload}) => {
        this.toastr.error(payload?.error ?? 'Възникна грешка', 'Error');
      })
    )
  },{dispatch:false})

  editFoodByIdBackToView$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(editFoodByIdSuccess),
        tap((edit) => {
          this.store.dispatch(
            setFoodDetailsMode({ mode: FoodDetailsMode.VIEW })
          );
        })
      );
    },
    { dispatch: false }
  );

  addFood$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addFood),
      switchMap(({ payload }) => {
        return this.service.add(payload.data).pipe(
          map((res) => {
            return addFoodSuccess();
          })
        );
      })
    );
  });
}

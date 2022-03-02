import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';

import { map, switchMap, tap } from 'rxjs/operators';

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
} from './foods.actions';

@Injectable()
export class FoodsEffects {
  constructor(
    private actions$: Actions,
    private service: FoodsService,
    private store: Store<IAppState>
  ) {}

  loadCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFoodsCategories),
      switchMap((action) => {
        return this.service.loadCategories().pipe(
          map((res) => {
            return loadFoodsCategoriesSuccess({foodCategories:res.data});
          })
        );
      })
    );
  });

  loadAutocompleteKeywords$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadAutocompleteKeywords),
      switchMap(({payload}) => {
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
      switchMap(({payload}) => {
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
      switchMap(({payload}) => {
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
      switchMap(({payload}) => {
        return this.service.search(payload.text).pipe(
          map((res) => {
            return loadSearchedFoodSuccess({
              foods: res.data
            });
          })
        );
      })
    );
  });

  loadFoodTypesByCategoryId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFoodTypesByCategoryId),
      switchMap(({payload}) => {
        return this.service.loadFoodTypesByCategoryId(payload.categoryId).pipe(
          map((res) => {
            return loadFoodTypesByCategoryIdSuccess({ foodTypes: res.data});
          })
        );
      })
    );
  });

  editFoodById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editFoodById),
      switchMap(({payload}) => {
        return this.service.edit(payload.foodId, payload.data).pipe(
          map(({ data }) => {
            return editFoodByIdSuccess({
              foodId: payload.foodId,
              data: data.food,
            });
          })
        );
      })
    );
  });

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
      switchMap(({payload}) => {
        return this.service.add(payload.data).pipe(map(res => {
          return addFoodSuccess();
        }))
      })
    )
  })
}

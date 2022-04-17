import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';

import { ToastrService } from 'ngx-toastr';

import { of } from 'rxjs';

import { catchError, debounceTime, map, switchMap, tap } from 'rxjs/operators';

import { FoodsService } from 'src/app/modules/@core/backend/services/foods.service';
import { setLoadingSpinner } from 'src/app/modules/shared/state/shared.actions';

import { IAppState } from 'src/app/state/app.state';

import { FoodDetailsMode } from '../models/foods-food.model';

import {
  loadFoodById,
  loadFoodByIdSuccess,
  loadFoodsByCategorySuccess,
  loadFoodsCategories,
  loadFoodsCategoriesSuccess,
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
  addFoodFailure,
  deleteFood,
  deleteFoodSuccess,
  deleteFoodFailure,
  loadFoodByIdFailure,
} from './foods.actions';

@Injectable()
export class FoodsEffects {
  constructor(
    private actions$: Actions,
    private service: FoodsService,
    private store: Store<IAppState>,
    private toastr: ToastrService,
    private router: Router
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
            if (res.isOk) {
              return loadFoodByIdSuccess({ food: res.data });
            }
            return loadFoodByIdFailure({error:res.Errors[0].Error})
          }),
          catchError(err => {
            return of(loadFoodByIdFailure({}));
          })
        );
      })
    );
  });

  loadFoodByIdFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFoodByIdFailure),
      tap(({payload}) => {
        this.toastr.error(payload.error ?? 'Възникна грешка','Error');
        this.router.navigate(['/','pages','foods']);
      })
    )
  },{dispatch:false})

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
            if (res.isOk) {
              this.toastr.success(
                'Успешно обновихте данните храната',
                'Success'
              );
              return editFoodByIdSuccess({
                foodId: payload.foodId,
                data: res.data.food,
              });
            }
            return editFoodByIdFailure({ error: res.Errors[0].Error });
          }),
          catchError((err) => {
            return of(editFoodByIdFailure({ error: err.error.error }));
          })
        );
      })
    );
  });

  editFoodByIdFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(editFoodByIdFailure),
        tap(({ payload }) => {
          this.toastr.error(payload?.error ?? 'Възникна грешка', 'Error');
          this.router.navigate(['/', 'pages', 'foods']);
        })
      );
    },
    { dispatch: false }
  );

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
            if (res.isOk) {
              this.toastr.success('Успешно добавихте нова храна', 'Success');
              this.router.navigate(['/', 'pages', 'foods']);
              return addFoodSuccess();
            }
            return addFoodFailure({ error: res.Errors[0].error });
          }),
          catchError((err) => {
            return of(addFoodFailure({ error: err?.error.error }));
          })
        );
      })
    );
  });
  addFoodFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(addFoodFailure),
        tap(({ payload }) => {
          this.toastr.error(payload?.error ?? 'Възникна грешка');
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  deleteFood$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteFood),
      tap(action => {
        this.store.dispatch(setLoadingSpinner({status:true}));
      }),
      debounceTime(1500),
      switchMap(({ payload }) => {
        return this.service.delete(payload.foodId).pipe(
          map((res) => {
            if (res.isOk) {
              this.toastr.success('Успешно изтрихте храната','Success');
              this.router.navigate(['/','pages','foods']);
              this.store.dispatch(setLoadingSpinner({status:false}));
              return deleteFoodSuccess({ foodId: res.data });
            }
            return deleteFoodFailure({ error: res.Errors[0].Error });
          }),
          catchError((err) => {
            return of(addFoodFailure({ error: err.error.error }));
          })
        );
      })
    );
  });

  deleteFoodFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deleteFoodFailure),
        tap(({ payload }) => {
          this.toastr.error(payload?.error ?? 'Възникна грешка');
          this.router.navigate(['/']);
          this.store.dispatch(setLoadingSpinner({status:false}));
        })
      );
    },
    { dispatch: false }
  );
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ToastrService } from 'ngx-toastr';

import { exhaustMap, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';

import { ReadingsService } from '../../../@core/backend/services/readings.service';

import {
  addReading,
  addReadingSuccess,
  loadSubCategoryWithPreviews,
  loadSubCategoryWithPreviewsSuccess,
  loadKnowledge,
  loadKnowledgeSuccess,
  loadMainCategoryWithPreviews,
  loadMainCategoryWithPreviewsSuccess,
  loadReading,
  loadReadingSuccess,
  loadReadingMainCategories,
  loadReadingMainCategoriesSuccess,
  loadReadingSubCategories,
  loadReadingSubCategoriesSuccess,
  loadMainCategoryWithPreviewsFailure,
  loadSubCategoryWithPreviewsFailure,
} from './readings.actions';

@Injectable()
export class PagesEffects {
  constructor(
    private readingService: ReadingsService,
    private actions$: Actions,
    private toastr: ToastrService,
    private router:Router
  ) {}

  loadKnowledge$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadKnowledge),
      switchMap((action) => {
        return this.readingService.loadKnowledge().pipe(
          map((res) => {
            return loadKnowledgeSuccess({ knowledge: res.data });
          })
        );
      })
    );
  });

  loadMainCategoryWithPreviews$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMainCategoryWithPreviews),
      exhaustMap(({ payload }) => {
        return this.readingService
          .loadMainCategoryWithPreviews(payload.category)
          .pipe(
            map((res) => {
              console.log(res);
              if (res.isOk) {
                return loadMainCategoryWithPreviewsSuccess({
                  mainCategoryWithPreviews: res.data,
                });
              }
              return loadMainCategoryWithPreviewsFailure();
            })
          );
      })
    );
  });

  loadMainCategoryWithPreviewsFailure$ = createEffect(() => {
    return this.actions$.pipe(ofType(loadMainCategoryWithPreviewsFailure),
    tap(action => {
      this.toastr.error('Няма такава категория','Error')
      this.router.navigate(['/'])
    }))
  },{dispatch:false})

  loadSubCategoryWithPreviews$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSubCategoryWithPreviews),
      mergeMap(({ payload }) => {
        return this.readingService
          .loadSubCategoryWithPreviews(
            payload.mainCategory,
            payload.subCategory
          )
          .pipe(
            map((res) => {
              if (res.isOk) {
                return loadSubCategoryWithPreviewsSuccess({
                  subCategoryWithPreviews: res.data,
                });
              }
              return loadSubCategoryWithPreviewsFailure();
            })
          );
      })
    );
  });

  loadSubCategoryWithPreviewsFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSubCategoryWithPreviewsFailure),
      take(1),
      tap(action => {
        console.log('asd')
        this.toastr.error('Няма такава категория','Error');
        this.router.navigate(['/']);
      })
    )
  },{dispatch:false})

  loadReading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadReading),
      switchMap(({ payload }) => {
        return this.readingService
          .loadReading(payload.id)
          .pipe(
            map((r) => {
              return loadReadingSuccess({ currentReading: r.data });
            })
          );
      })
    );
  });

  loadReadingMainCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadReadingMainCategories),
      switchMap(({ payload }) => {
        return this.readingService.loadReadingMainCategories().pipe(
          map((res) => {
            return loadReadingMainCategoriesSuccess({
              categories: res.data,
            });
          })
        );
      })
    );
  });

  loadReadingSubCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadReadingSubCategories),
      switchMap(({ payload }) => {
        return this.readingService
          .loadReadingSubCategories(payload.mainId)
          .pipe(
            map((res) => {
              return loadReadingSubCategoriesSuccess({
                categories: res.data,
              });
            })
          );
      })
    );
  });

  addReading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addReading),
      exhaustMap(({ payload }) => {
        return this.readingService.add(payload.data).pipe(
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
}

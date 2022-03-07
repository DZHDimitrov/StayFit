import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';

import { ToastrService } from 'ngx-toastr';

import { exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { IAppState } from 'src/app/state/app.state';

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
} from './readings.actions';

@Injectable()
export class PagesEffects {
  constructor(
    private readingService: ReadingsService,
    private actions$: Actions,
    private store: Store<IAppState>,
    private toastr: ToastrService
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
              return loadMainCategoryWithPreviewsSuccess({
                mainCategoryWithPreviews: res.data,
              });
            })
          );
      })
    );
  });

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
              return loadSubCategoryWithPreviewsSuccess({
                subCategoryWithPreviews: res.data,
              });
            })
          );
      })
    );
  });

  loadReading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadReading),
      switchMap(({ payload }) => {
        return this.readingService
          .loadReading(payload.mainCategory, payload.subCategory, payload.id)
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

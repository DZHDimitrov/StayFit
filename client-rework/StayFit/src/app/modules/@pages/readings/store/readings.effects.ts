import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

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
  addReadingFailure,
  loadReadingFailure,
  loadReadingForEdit,
  loadReadingForEditSuccess,
  loadReadingForEditFailure,
  editReading,
  editReadingSuccess,
  editReadingFailure,
  deleteReading,
  deleteReadingSuccess,
  deleteReadingFailure,
} from './readings.actions';

@Injectable()
export class PagesEffects {
  constructor(
    private readingService: ReadingsService,
    private actions$: Actions,
    private toastr: ToastrService,
    private router: Router
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
              if (res.isOk) {
                return loadMainCategoryWithPreviewsSuccess({
                  mainCategoryWithPreviews: res.data,
                });
              }
              return loadMainCategoryWithPreviewsFailure({
                error: res.Errors[0].Error,
              });
            })
          );
      })
    );
  });

  loadMainCategoryWithPreviewsFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadMainCategoryWithPreviewsFailure),
        tap(({ payload }) => {
          this.toastr.error(payload?.error ?? 'Възникна грешка', 'Error');
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

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
              return loadSubCategoryWithPreviewsFailure({
                error: res.Errors[0].Error,
              });
            })
          );
      })
    );
  });

  loadSubCategoryWithPreviewsFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadSubCategoryWithPreviewsFailure),
        take(1),
        tap(({ payload }) => {
          this.toastr.error(payload?.error ?? 'Възникна грешка', 'Error');
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  loadReading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadReading),
      switchMap(({ payload }) => {
        return this.readingService.loadReading(payload.id).pipe(
          map((res) => {
            if (res.isOk) {
              return loadReadingSuccess({ currentReading: res.data });
            }
            return loadReadingFailure({ error: res.Errors[0].Error });
          }),
          catchError((err) => {
            return of(loadReadingFailure());
          })
        );
      })
    );
  });

  loadReadingFailure = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadReadingFailure),
        tap(({ payload }) => {
          this.router.navigate(['/']);
          this.toastr.error(payload?.error ?? 'Възникна грешка', 'Error');
        })
      );
    },
    { dispatch: false }
  );

  loadReadingForEdit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadReadingForEdit),
      switchMap(({ payload }) => {
        return this.readingService.loadReadingForEdit(payload.id).pipe(
          map((res) => {
            if (res.isOk) {
              return loadReadingForEditSuccess({ currentReading: res.data });
            }
            return loadReadingForEditFailure({ error: res.Errors[0].Error });
          })
        );
      })
    );
  });

  loadReadingForEditFailure = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadReadingForEditFailure),
        tap(({ payload }) => {
          this.toastr.error(payload.error ?? 'Възникна грешка', 'Error');
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

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
          map((res) => {
            if (res.isOk) {
              return addReadingSuccess();
            }
            return addReadingFailure({ error: res.Errors[0].Error });
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
          this.router.navigate(['/','pages','readings']);
        })
      );
    },
    { dispatch: false }
  );

  addReadingFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(addReadingFailure),
        tap(({ payload }) => {
          this.toastr.error(payload.error ?? 'Възникна грешка', 'Error');
        })
      );
    },
    { dispatch: false }
  );

  editReading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editReading),
      switchMap(({ payload }) => {
        return this.readingService.edit(payload.readingId, payload.data).pipe(
          map((res) => {
            if (res.isOk) {
              return editReadingSuccess();
            }
            return editReadingFailure({ error: res.Errors[0].Error });
          }),
          catchError((err) => {
            return of(editReadingFailure({ error: err.error.error }));
          })
        );
      })
    );
  });

  editReadingSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(editReadingSuccess),
        tap((action) => {
          this.toastr.success('Успешно обновихте статията', 'Success');
          this.router.navigate(['/', 'pages', 'readings']);
        })
      );
    },
    { dispatch: false }
  );

  editReadingFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(editReadingFailure),
        tap(({ payload }) => {
          this.toastr.error(payload?.error ?? 'Възникна грешка', 'Error');
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  deleteReading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteReading),
      switchMap(({ payload }) => {
        return this.readingService.delete(payload.readingId).pipe(
          map((res) => {
            if (res.isOk) {
              this.toastr.success('Успешно изтрихте статията', 'Success');
              return deleteReadingSuccess();
            }
            return deleteReadingFailure({ error: res.Errors[0].Error });
          }),
          catchError((err) => {
            return of(deleteReadingFailure({ error: err.error.error }));
          })
        );
      })
    );
  });

  deleteReadingFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deleteReadingFailure),
        tap(({ payload }) => {
          this.toastr.error(payload?.error ?? 'Възникна грешка', 'Error');
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { IAppState } from 'src/app/state/app.state';
import { ReadingsService } from '../../@core/backend/services/readings.service';
import {
  addReading,
  addReadingSuccess,
  loadReadingMainCategories,
  loadReadingMainCategoriesSuccess,
  loadReadingSubCategories,
  loadReadingSubCategoriesSuccess,
} from './admin.actions';

@Injectable()
export class AdminEffects {
  constructor(
    private actions$: Actions,
    private readingService: ReadingsService,
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
              console.log(x);
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

  addReadingSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addReadingSuccess),
      tap((action) => {
        this.toastr.success('Успешно добавяне на четиво', 'Success');
      })
    );
  },{dispatch:false});
}

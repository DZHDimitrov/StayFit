import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { IAppState } from 'src/app/state/app.state';
import { setInnerNav } from '../../@components/state/components.actions';
import { ReadingsService } from '../../@core/backend/services/readings.service';
import {
  loadCatalogueByMainCategory,
  loadCatalogueByMainCategorySuccess,
  loadCatalogueBySubCategory,
  loadCatalogueBySubCategorySuccess,
  loadCategoriesLatestPreviews,
  loadCategoriesLatestPreviewsSuccess,
  loadReadingById,
  loadReadingByIdSuccess,
} from './pages.actions';

@Injectable()
export class PagesEffects {
  constructor(
    private readingService: ReadingsService,
    private actions$: Actions,
    private store: Store<IAppState>
  ) {}

  loadCategoriesLatestPreviews$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCategoriesLatestPreviews),
      mergeMap((action) => {
        return this.readingService.loadCategoriesLatestPreviews().pipe(
          map((res) => {
            return loadCategoriesLatestPreviewsSuccess({
              latestPreviews: res.data,
              navBar: {
                title: 'Знание',
                navItems: res.data.map((category) => {
                  const { previews, ...navItems } = category;
                  return navItems;
                }),
              },
            });
          })
        );
      })
    );
  });

  loadCategoriesLatestPreviewsSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadCategoriesLatestPreviewsSuccess),
        tap((action) => {
          this.store.dispatch(setInnerNav({ navBar: action.navBar }));
        })
      );
    },
    { dispatch: false }
  );

  setContentByMainCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCatalogueByMainCategory),
      mergeMap((action) => {
        return this.readingService.listByMainCategory(action.category).pipe(
          map((res) => {
            console.log(res);
            res.data.previews = res.data.previews.map((p) => {
              if (p.name.includes('начинаещи')) {
                return {
                  ...p,
                  name: 'За начинаещи',
                };
              } else if (p.name.includes('Статии')) {
                return {
                  ...p,
                  name: 'Статии',
                };
              } else if (p.name.includes('Още')) {
                return {
                  ...p,
                  name: 'Още статии',
                };
              }
              return p;
            });
            return loadCatalogueByMainCategorySuccess({
              navBar: {
                navItems: res.data.previews,
                title: res.data.name,
              },
              previews: res.data.previews,
              hasChildren: res.data.hasChildren,
            });
          })
        );
      })
    );
  });

  setContentByMainCategorySuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadCatalogueByMainCategorySuccess),
        tap((action) => {
          this.store.dispatch(
            setInnerNav({
              navBar: action.navBar,
              hasChildren: action.hasChildren,
            })
          );
        })
      );
    },
    { dispatch: false }
  );

  setContentBySubCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCatalogueBySubCategory),
      mergeMap((action) => {
        return this.readingService
          .listBySubCategory(action.mainCategory, action.subCategory)
          .pipe(
            map((res) => {
              return loadCatalogueBySubCategorySuccess({
                navBar: {
                  title: res.data?.name,
                  navItems: res.data?.categories.map((c) => {
                    return {
                      ...c,
                      name: c.name.includes('начинаещи')
                        ? 'За начинаещи'
                        : c.name.includes('Статии')
                        ? 'Статии'
                        : c.name,
                    };
                  }),
                },
                previews: res.data?.previews,
              });
            })
          );
      })
    );
  });

  setContentBySubCategorySuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadCatalogueBySubCategorySuccess),
        tap((action) => {
          this.store.dispatch(setInnerNav({ navBar: action.navBar }));
        })
      );
    },
    { dispatch: false }
  );

  loadReading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadReadingById),
      switchMap((action) => {
        let reading$: Observable<any> = new Observable();
        if (action.id) {
          reading$ = this.readingService.loadOneByIdInSubGroup(
            action.mainCategory,
            action.subCategory,
            action.id
          );
        } else {
          reading$ = this.readingService.loadOneByMainCategory(
            action.mainCategory,
            action.subCategory
          );
        }
        return reading$.pipe(
          map((r) => {
            return loadReadingByIdSuccess({ currentReading: r.data });
          })
        );
      })
    );
  });
}

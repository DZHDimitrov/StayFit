import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { ReadingsService } from '../../@core/backend/services/readings.service';
import { innerNavItemsLoaded, setInnerNavItems } from './components.actions';

@Injectable()
export class ComponentsEffects {
  constructor(
    private actions$: Actions,
    private readingService: ReadingsService
  ) {}

  setInnerNav$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setInnerNavItems),
      mergeMap((action) => {
        if (!action.category) {
          return this.readingService.loadBaseCategories().pipe(
            map((x) => {
              return innerNavItemsLoaded({
                navItems: x.data.map((item) => {
                  return {
                    ...item,
                    searchName: item.searchName.toLowerCase(),
                  };
                }),
              });
            })
          );
        } else {
          return this.readingService.listByMainCategory(action.category).pipe(
            map((x) => {
              return innerNavItemsLoaded({
                navItems: x.data,
              });
            })
          );
        }
      })
    );
  });
}

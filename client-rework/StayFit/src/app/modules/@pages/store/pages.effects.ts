import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, mergeMap } from 'rxjs/operators';
import { ReadingsService } from '../../@core/backend/services/readings.service';
import { Readings } from '../../@core/enums/reading.category';
import {
  loadGroupContent,
  loadGroupContentSuccess,
  loadLatestReadings,
  loadLatestReadingSuccess,
} from './pages.actions';

@Injectable()
export class PagesEffects {
  constructor(
    private readingService: ReadingsService,
    private actions$: Actions,
  ) {}

  loadLatestByCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadLatestReadings),
      mergeMap((action) => {
        return this.readingService
          .loadLatest([
            Readings.Articles,
            Readings.Guides,
            Readings.Nutritions,
            Readings.Supplements,
            Readings.Trainigs,
          ])
          .pipe(
            map((x) => {
              return loadLatestReadingSuccess({ latestReadings: x.data });
            })
          );
      })
    );
  });

  loadGroupContent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadGroupContent),
      exhaustMap((action) => {
        return this.readingService.listByMainCategory(action.group).pipe(
          map((d) => {
            return loadGroupContentSuccess({
              content: d.data,
              hasChildren: true,
            });
          })
        );
      })
    );
  });
}

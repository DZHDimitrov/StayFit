import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, switchMap, take, takeLast } from 'rxjs/operators';
import { IAppState } from 'src/app/state/app.state';
import { ReadingsService } from '../../@core/backend/services/readings.service';

@Injectable()
export class ComponentsEffects {
  constructor(
    private actions$: Actions,
    private readingService: ReadingsService,
    private store: Store<IAppState>
  ) {}
}

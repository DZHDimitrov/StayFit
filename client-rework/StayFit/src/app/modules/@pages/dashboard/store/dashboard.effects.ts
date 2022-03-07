import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { DashboardService } from 'src/app/modules/@core/backend/services/dashboard.service';
import { setLoadingSpinner } from 'src/app/modules/shared/state/shared.actions';
import { IAppState } from 'src/app/state/app.state';
import { createDiarySuccess } from '../../diary/store/diary.actions';
import { loadTasks, loadTasksSuccess, removeTask } from './dashboard.actions';

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
    private store:Store<IAppState>
  ) {}

  loadTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTasks),
      switchMap(({ payload }) => {
        return this.dashboardService.loadTasks().pipe(
          map((res) => {
            return loadTasksSuccess({ tasks: res.data });
          })
        );
      })
    );
  });

  loadTaskSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTasksSuccess),
      tap(action => {
        this.store.dispatch(setLoadingSpinner({status:false}))
      })
    )
  },{dispatch:false})

  createDiarySuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createDiarySuccess),
      map(action => {
        this.store.dispatch(loadTasks());
        return removeTask({taskId:1});
      })
    )
  })
}

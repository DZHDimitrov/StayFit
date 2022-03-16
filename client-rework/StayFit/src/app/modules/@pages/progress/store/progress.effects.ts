import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap, tap } from 'rxjs/operators';
import { ProgressService } from 'src/app/modules/@core/backend/services/progress.service';
import {
  createMeasurement,
  createMeasurementSuccess,
  deleteMeasurement,
  deleteMeasurementSuccess,
  editMeasurementById,
  editMeasurementByIdSuccess,
  loadMeasurementById,
  loadMeasurementByIdSuccess,
  loadMeasurements,
  loadMeasurementsSuccess,
} from './progress.actions';

@Injectable()
export class ProgressEffects {
  constructor(
    private actions$: Actions,
    private progressService: ProgressService,
    private router:Router,
    private toastr:ToastrService
  ) {}

  createMeasurement$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createMeasurement),
      switchMap(({ payload }) => {
        return this.progressService.createMeasurement(payload.data).pipe(
          map((res) => {
            return createMeasurementSuccess({ addedCount: res.data });
          })
        );
      })
    );
  });

  createMeasurementSuccess$ = createEffect(() => {
      return this.actions$.pipe(
          ofType(createMeasurementSuccess),
          tap(action => {
              this.toastr.success('Добавихте ново измерване','Успех');
              this.router.navigate(['/','pages','progress']);
          })
      )
  },{dispatch:false})

  editMeasurementById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editMeasurementById),
      switchMap(({ payload }) => {
        return this.progressService
          .editMeasurementById(payload.measurementId, payload.data)
          .pipe(
            map((res) => {
              return editMeasurementByIdSuccess({ id: res.data });
            })
          );
      })
    );
  });

  editMeasurementByIdSuccess$ = createEffect(() => {
      return this.actions$.pipe(
          ofType(editMeasurementByIdSuccess),
          tap(action => {
            this.toastr.success('Измерването беше обновено','Успех');
            this.router.navigate(['/','pages','progress']);
          })
      )
  },{dispatch:false})

  loadMeasurements$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMeasurements),
      switchMap(({ payload }) => {
        return this.progressService.loadMeasurements().pipe(
          map((res) => {
            return loadMeasurementsSuccess({ measurements: res.data });
          })
        );
      })
    );
  });

  loadMeasurementById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMeasurementById),
      switchMap(({ payload }) => {
        return this.progressService
          .loadMeasurementById(payload.measurementId)
          .pipe(
            map((res) => {
              return loadMeasurementByIdSuccess({ measurement: res.data });
            })
          );
      })
    );
  });

  deleteMeasurement$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteMeasurement),
      switchMap(({ payload }) => {
        return this.progressService
          .deleteMeasurement(payload.measurementId)
          .pipe(
            map((res) => {
              return deleteMeasurementSuccess({
                measurementId: payload.measurementId,
              });
            })
          );
      })
    );
  });

  deleteMeasurementSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteMeasurementSuccess),
      tap(action => {
        this.toastr.success('Измерването беше изтрито','Успех')
      })
    )
  })
}

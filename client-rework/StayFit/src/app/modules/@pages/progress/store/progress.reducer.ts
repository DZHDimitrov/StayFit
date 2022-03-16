import { createReducer, on } from '@ngrx/store';
import { deleteMeasurementSuccess, editMeasurementByIdSuccess, loadMeasurementByIdSuccess, loadMeasurementsSuccess } from './progress.actions';
import { initialState } from './progress.state';

const _progressReducer = createReducer(
  initialState,
  on(loadMeasurementsSuccess, (state, { payload }) => {
    return {
      ...state,
      measurements: payload.measurements,
    };
  }),
  on(loadMeasurementByIdSuccess,(state,{payload}) => {
    return {
      ...state,
      measurement:payload.measurement,
    }
  }),
  on(deleteMeasurementSuccess,(state,{payload}) => {
    return {
      ...state,
      measurements:state.measurements?.filter(m => m.id != payload.measurementId) ?? [],
    }
  }),
);

export const ProgressReducer = function (state, action) {
  return _progressReducer(state, action);
};

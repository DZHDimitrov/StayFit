import { Measurement } from '../models/measurement.model';

export interface IProgressState {
  measurements: Measurement[] | null;
  measurement: Measurement | null;
}

export const initialState: IProgressState = {
  measurements: null,
  measurement: null,
};

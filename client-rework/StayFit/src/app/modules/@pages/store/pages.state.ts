import { ILatestCategoryReadings } from '../../@core/interfaces/responses/readings/readings.res';

export interface IPagesState {
  latestReadings: ILatestCategoryReadings[];
  catalogue: {
    readings: any[];
    haveChildren: boolean;
  };
}

export const initialState: IPagesState = {
  latestReadings: [],
  catalogue: {
    readings: [],
    haveChildren: false,
  },
};

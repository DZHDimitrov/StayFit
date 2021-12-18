import { ICategoryReadingPreviews, IReading } from '../../@core/interfaces/responses/readings/readings.res';

export interface IPagesState {
  latestPreviews: ICategoryReadingPreviews[];
  catalogue: {
    previews: any[];
  };
  currentReading:IReading | null;
}

export const initialState: IPagesState = {
  latestPreviews: [],
  catalogue: {
    previews: [],
  },
  currentReading: null,
};

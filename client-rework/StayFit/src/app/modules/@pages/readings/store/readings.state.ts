import { IReading } from '../../../@core/interfaces/responses/readings/readings.interface';
import { ICategoryReadingPreviewData } from '../interfaces/reading.interface';

export interface IReadingsState {
  latestPreviews: ICategoryReadingPreviewData[];
  mainCategories: any[];
  subCategories: any[];
  readings: any[];
  catalogue: {
    previews: any[];
  };
  currentReading:IReading | null;
}

export const initialState: IReadingsState = {
  mainCategories: [],
  subCategories: [],
  readings: [],
  latestPreviews: [],
  catalogue: {
    previews: [],
  },
  currentReading: null,
};

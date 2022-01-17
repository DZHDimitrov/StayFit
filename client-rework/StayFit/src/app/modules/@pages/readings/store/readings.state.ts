import { IReading, IReadingCategory } from '../../../@core/interfaces/responses/readings/readings.interface';
import { ICategoryReadingPreviewData } from '../interfaces/reading.interface';

export interface IReadingsState {
  mainCategories: IReadingCategory[];
  subCategories: IReadingCategory[];
  latestPreviews: ICategoryReadingPreviewData[];
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

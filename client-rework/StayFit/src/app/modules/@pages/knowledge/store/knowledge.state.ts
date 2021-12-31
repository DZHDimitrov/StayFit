import { IReading } from '../../../@core/interfaces/responses/readings/readings.interface';
import { ICategoryReadingPreviewData } from '../interfaces/reading.interface';

export interface IKnowledgeState {
  latestPreviews: ICategoryReadingPreviewData[];
  catalogue: {
    previews: any[];
  };
  currentReading:IReading | null;
}

export const initialState: IKnowledgeState = {
  latestPreviews: [],
  catalogue: {
    previews: [],
  },
  currentReading: null,
};

import { ICategoryReadingPreviews, IReading } from '../../../@core/interfaces/readings/readings.interface';

export interface IKnowledgeState {
  latestPreviews: ICategoryReadingPreviews[];
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

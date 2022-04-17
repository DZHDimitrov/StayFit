import { INote } from "../models/diary.model";

export interface IDiaryState {
  diaryId: string | number | null;
  notes:INote[];
  note:INote | null;
}

export const initialState: IDiaryState = {
  diaryId: null,
  notes:[],
  note:null
};

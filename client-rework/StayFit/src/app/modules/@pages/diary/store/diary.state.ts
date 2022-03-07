import { INote } from "src/app/modules/@core/interfaces/diary/diary.interface";

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

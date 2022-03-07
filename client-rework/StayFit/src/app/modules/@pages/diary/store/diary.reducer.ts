import { createReducer, on } from '@ngrx/store';
import { createDiarySuccess, loadNoteById, loadNoteByIdSuccess, loadNotesSuccess } from './diary.actions';
import { initialState } from './diary.state';

const _diaryReducer = createReducer(
  initialState,
  on(createDiarySuccess, (state, action) => {
    return {
      ...state,
      diaryId: action.payload.diaryId,
    };
  }),
  on(loadNotesSuccess, (state, { payload }) => {
    return {
      ...state,
      notes: payload.notes,
    };
  }),
  on(loadNoteByIdSuccess,(state,{payload}) => {
    return {
      ...state,
      note: payload.note ?? null,
    }
  })
);

export const DiaryReducer = function (state, action) {
  return _diaryReducer(state, action);
};

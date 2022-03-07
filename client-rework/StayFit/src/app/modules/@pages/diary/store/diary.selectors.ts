import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IDiaryState } from "./diary.state";

export const DIARY_STATE_NAME = 'diary';

const getDiaryState =
  createFeatureSelector<IDiaryState>(DIARY_STATE_NAME);


export const getNotes = createSelector(getDiaryState,(state) => {
    return state.notes;
})

export const getNoteById = createSelector(getDiaryState,(state) => {
  return state.note;
})
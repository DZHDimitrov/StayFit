import { createReducer, on } from '@ngrx/store';
import {
  loadGroupContentSuccess,
  loadLatestReadingSuccess,
} from './pages.actions';
import { initialState } from './pages.state';

export const _pagesReducer = createReducer(
  initialState,
  on(loadLatestReadingSuccess, (state, action) => {
    return {
      ...state,
      latestReadings: action.latestReadings,
    };
  }),
  on(loadGroupContentSuccess, (state, action) => {
    return {
      ...state,
      catalogue: {
        readings: action.content,
        haveChildren: action.hasChildren,
      },
    };
  })
);

export const PagesReducer = function (state, action) {
  return _pagesReducer(state, action);
};

import { createReducer, on } from '@ngrx/store';
import {
  innerNavItemsLoaded,
  setInnerNavTitle,
} from './components.actions';
import { initialState } from './components.state';

const _componentsReducer = createReducer(
  initialState,
  on(innerNavItemsLoaded, (state, action) => {
    return {
      ...state,
      innerNavBar: {
        ...state.innerNavBar,
        navItems: action.navItems,
      },
    };
  }),
  on(setInnerNavTitle, (state, action) => {
    return {
      ...state,
      innerNavBar: {
        ...state.innerNavBar,
        title: action.title,
      },
    };
  })
);

export function ComponentsReducer(state, action) {
  return _componentsReducer(state, action);
}

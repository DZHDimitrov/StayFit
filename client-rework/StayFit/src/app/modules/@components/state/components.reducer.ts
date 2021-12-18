import { createReducer, on } from '@ngrx/store';
import { setInnerNav } from './components.actions';
import { initialState } from './components.state';

const _componentsReducer = createReducer(
  initialState,
  on(setInnerNav, (state, action) => {
    return {
      ...state,
      innerNavBar: {
        ...action.navBar,
        navItems:
          action.hasChildren !== undefined && action.hasChildren === false
            ? state.innerNavBar.navItems
            : action.navBar.navItems,
      },
      // action.hasChildren !== undefined && action.hasChildren === false
      //   ? state.innerNavBar
      //   : action.navBar,
    };
  })
);

export function ComponentsReducer(state, action) {
  return _componentsReducer(state, action);
}

import { createReducer, on } from '@ngrx/store';
import { setFoodsIntroTitle, setInnerNav } from './components.actions';
import { initialState } from './components.state';

const _componentsReducer = createReducer(
  initialState,
  on(setInnerNav, (state, action) => {
    console.log(action.navBar.navItems)
    return {
      ...state,
      innerNavBar: {
        ...action.navBar,
        navItems:
          action.hasChildren !== undefined && action.hasChildren === false
            ? state.innerNavBar.navItems
            : action.navBar.navItems,
      },
    };
  }),
  on(setFoodsIntroTitle, (state, action) => {
    return {
      ...state,
      foodsIntro: {
        ...state.foodsIntro,
        title: action.title,
      },
    };
  })
);

export function ComponentsReducer(state, action) {
  return _componentsReducer(state, action);
}

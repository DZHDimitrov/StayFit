import { createReducer, on } from '@ngrx/store';
import { setFoodsIntroTitle, setMiniNavbar } from './components.actions';
import { initialState } from './components.state';

const _componentsReducer = createReducer(
  initialState,
  on(setMiniNavbar, (state, action) => {
    return {
      ...state,
      innerNavBar: {navItems:action.navItems,title:action.title},
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

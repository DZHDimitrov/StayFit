import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IComponentState } from './components.state';

export const COMPONENTS_STATE_NAME = 'components';

export const getComponenetsState = createFeatureSelector<IComponentState>(
  COMPONENTS_STATE_NAME
);

export const getInnerNav = createSelector(getComponenetsState, (state) => {
  const miniNavBar = JSON.parse(JSON.stringify(state.innerNavBar));
  if (miniNavBar) {
    miniNavBar.navItems = miniNavBar?.navItems?.map((i) => {
      return i.includes('Ръководство')
        ? 'Ръководство'
        : i.includes('Статии')
        ? 'Статии'
        : i;
    });
  }

  return miniNavBar;
});

export const getFoodsIntroTitle = createSelector(
  getComponenetsState,
  (state) => {
    return state.foodsIntro.title;
  }
);

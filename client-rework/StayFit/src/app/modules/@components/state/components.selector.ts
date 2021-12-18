import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IComponentState } from './components.state';

export const COMPONENTS_STATE_NAME = 'components';

export const getComponentsSelector = createFeatureSelector<IComponentState>(
  COMPONENTS_STATE_NAME
);

export const getInnerNav = createSelector(getComponentsSelector, (state) => {
  return state.innerNavBar;
});

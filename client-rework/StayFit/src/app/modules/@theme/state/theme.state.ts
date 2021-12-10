import { NbMenuItem } from '@nebular/theme';
import { INavItem } from '../misc/content/navigation.content';

export interface IThemeState {
  navItems: INavItem[];
  menuItems: NbMenuItem[];
}

export const initialState: IThemeState = {
  navItems: [],
  menuItems: [],
};

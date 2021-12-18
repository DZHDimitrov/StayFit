import { INavItem } from '../misc/content/navigation.content';
import { IMenuItem } from '../misc/content/user-menu.content';

export interface IThemeState {
  navItems: INavItem[];
  menuItems: IMenuItem[];
}

export const initialState: IThemeState = {
  navItems: [],
  menuItems: [],
};

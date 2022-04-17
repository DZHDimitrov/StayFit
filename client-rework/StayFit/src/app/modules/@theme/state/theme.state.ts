import { INavItem } from '../misc/content/navigation.content';

import { IMenuItem } from '../misc/content/user-menu.content';

export interface IThemeState {
  navItems: INavItem[];
  menuItems: IMenuItem[];
  isDiaryOwner:boolean | null;
}

export const initialState: IThemeState = {
  navItems: [],
  menuItems: [],
  isDiaryOwner: null,
};

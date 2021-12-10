export interface INavItem {
  title: string;
  link: string[] | string;
}

export const GUEST_NAV_ITEMS: INavItem[] = [
  {
    title: 'Stay fit',
    link: ['/'],
  },
  {
    title: 'Форум',
    link: '',
  },
  {
    title: 'Услуги',
    link: '',
  },
  {
    title: 'Магазин',
    link: '',
  },
  {
    title: 'Знание',
    link: ['pages', 'knowledge'],
  },
];

export const USER_NAV_ITEMS: INavItem[] = [
  {
    title: 'Stay fit',
    link: '',
  },
  {
    title: 'Дневник',
    link: '',
  },
  {
    title: 'Прогрес',
    link: '',
  },
  {
    title: 'Магазин',
    link: '',
  },
  {
    title: 'Знание',
    link: ['pages', 'knowledge'],
  },
];

export interface INavItem {
  title: string;
  link: string[] | string;
}

//TODO: Try to do it smarter.
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
    link: ['pages', 'readings'],
  },
];

export const USER_NAV_ITEMS_NO_DIARY: INavItem[] = [
  {
    title: 'Днес',
    link: ['pages','dashboard'],
  },
  {
    title:'Услуги',
    link:''
  },
  {
    title:'Форум',
    link: '',
  },
  {
    title: 'Магазин',
    link: '',
  },
  {
    title: 'Знание',
    link: ['pages', 'readings'],
  },
];

export const USER_NAV_ITEMS_DIARY: INavItem[] = [
  {
    title: 'Днес',
    link: ['pages','dashboard'],
  },
  {
    title: 'Дневник',
    link:[],
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
    link: ['pages', 'readings'],
  },
]

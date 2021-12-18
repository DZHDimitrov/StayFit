import { NbMenuItem } from '@nebular/theme';

export interface IMenuItem {
  title?: string;
  link?: string;
  data?: any;
}

export const GUEST_ITEMS: IMenuItem[] = [
  {
    title: 'Login',
    link: 'account/login',
  },
  {
    title: 'Register',
    link: 'account/register',
  },
];

export const USER_ITEMS: IMenuItem[] = [
  {
    title: 'За четене',
    link: '',
  },
  {
    title: 'Профил',
    link: 'account/profile',
  },
  {
    title: 'Настройки',
    link: '',
  },
  {
    title: 'Помощ',
    link: '',
  },
  {
    title: 'Съобщения',
  },
  {
    title: 'Изход',
    link: '/',
    data: {
      id: 'logout',
    },
  },
];

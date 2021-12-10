import { NbMenuItem } from "@nebular/theme";

export const GUEST_ITEMS: NbMenuItem[] = [
    {
      title: 'Login',
      link: 'account/login',
    },
    {
      title: 'Register',
      link: 'account/register',
    },
  ];
  
  export const USER_ITEMS: NbMenuItem[] = [
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
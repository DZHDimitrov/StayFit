import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IAppState } from 'src/app/state/app.state';
import { autoLogout } from '../../@auth/state/auth.actions';
import { isAuthenticated } from '../../@auth/state/auth.selector';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  isAuthenticated: boolean = false;

  listItems: any[] = [
    {
      title: 'StayFit',
      link: '/',
    },
    {
      title: 'StayFitBetter',
      link: '',
    },
    {
      title: 'Услуги',
      link: '',
    },
    {
      title: 'Форум',
      link: '',
    },
    {
      title: 'Знание',
      link: '',
    },
  ];

  items: NbMenuItem[] = [];

  constructor(
    private store: Store<IAppState>,
    private nbMenuService: NbMenuService
  ) {}
  test() {}

  ngOnInit(): void {
    this.store.select(isAuthenticated).subscribe((x) => {
      this.isAuthenticated = x;
      this.items = [
        {
          title: 'Вход',
          link: 'account/login',
          hidden: this.isAuthenticated,
        },
        {
          title: 'Регистрация',
          link: 'account/register',
          hidden: this.isAuthenticated,
        },
        {
          title: 'Изход',
          link: 'pages/home',
          data: {
            id: 'logout',
          },
        },
        {
          title: 'Профил',
          link: 'account/profile',
          hidden: !this.isAuthenticated,
        },
        {
          title: 'Съобщения',
          hidden: !this.isAuthenticated,
        },
      ];
      this.nbMenuService.onItemClick().subscribe((x) => {
        if (x.item.data && x.item.data.id == 'logout') {
          this.store.dispatch(autoLogout());
        }
      });
    });
  }
}

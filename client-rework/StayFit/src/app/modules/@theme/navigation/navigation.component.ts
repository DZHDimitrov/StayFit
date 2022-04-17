import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { IAppState } from 'src/app/state/app.state';

import { autoLogout } from '../../@auth/state/auth.actions';

import { getUser, isAuthenticated } from '../../@auth/state/auth.selector';
import { Roles } from '../../@core/enums/roles';

import { INavItem } from '../misc/content/navigation.content';

import { IMenuItem } from '../misc/content/user-menu.content';

import { getMenuItems, getNavItems } from '../state/theme.selector';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(private store: Store<IAppState>, private router: Router) {}

  userItems$!: Observable<IMenuItem[]>;
  userNavItems$!: Observable<INavItem[]>;
  isLoggedIn$!: Observable<boolean>;
  hasPrivilege$!: Observable<boolean | undefined>;

  get currentMonth() {
    const month = new Date().getMonth() + 1;

    return this.pad(month.toString());
  }

  ngOnInit(): void {
    this.userItems$ = this.store
      .select(getMenuItems)
      .pipe(map(this.cloneArray));

    this.userNavItems$ = this.store
      .select(getNavItems)
      .pipe(map(this.cloneArray));

    this.isLoggedIn$ = this.store.select(isAuthenticated);

    this.hasPrivilege$ = this.store.select(getUser).pipe(
      map((user) => {
        return user?.hasRole(Roles.ADMINISTRATOR);
      })
    );
  }

  navigate(el: any) {
    if (el.title == 'Дневник') {
      const currentYear = new Date().getFullYear().toString();
      const currentMonth = this.currentMonth;

      this.router.navigate([
        'pages',
        'diary',
        currentYear,
        currentMonth,
        'overview',
      ]);
    }
  }

  logout(item: any) {
    if (item.data?.id == 'logout') {
      this.store.dispatch(autoLogout());
    }
  }
  private cloneArray = (data: any) => {
    return JSON.parse(JSON.stringify(data));
  };

  private pad(day: string) {
    if (day.length < 2) {
      return '0' + day;
    }
    return day;
  }
}

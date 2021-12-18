import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAppState } from 'src/app/state/app.state';
import { autoLogout } from '../../@auth/state/auth.actions';
import { isAuthenticated } from '../../@auth/state/auth.selector';
import { INavItem } from '../misc/content/navigation.content';
import { IMenuItem } from '../misc/content/user-menu.content';
import { getMenuItems, getNavItems } from '../state/theme.selector';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  userItems$!: Observable<IMenuItem[]>;
  userNavItems$!: Observable<INavItem[]>;
  isLoggedIn$!: Observable<boolean>;
  constructor(
    private store: Store<IAppState>,
  ) {}

  ngOnInit(): void {
    this.userItems$ = this.store.select(getMenuItems).pipe(map(this.cloneArray));
    this.userNavItems$ = this.store.select(getNavItems).pipe(map(this.cloneArray));
    this.isLoggedIn$ = this.store.select(isAuthenticated);
  }

  logout(item:any) {
    if (item.data?.id == 'logout') {
      this.store.dispatch(autoLogout());
    }
  }
  private cloneArray = (data: any) => {
    return JSON.parse(JSON.stringify(data));
  };
}

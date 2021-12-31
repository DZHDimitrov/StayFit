import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GUEST_ITEMS } from './modules/@theme/misc/content/user-menu.content';
import { GUEST_NAV_ITEMS } from './modules/@theme/misc/content/navigation.content';
import { setNavMenu, setUserMenu } from './modules/@theme/state/theme.actions';
import {
  getLoading,
} from './modules/shared/state/shared.selector';
import { IAppState } from './state/app.state';
import { autoLogin } from './modules/@auth/state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<IAppState>) {
    this.store.dispatch(setUserMenu({ menuItems: GUEST_ITEMS }));
  }
  showLoading$!: Observable<boolean>;
  errorMessage$!: Observable<string>;
  ngOnInit(): void {
    this.showLoading$ = this.store.select(getLoading);
    this.store.dispatch(setNavMenu({ navItems: GUEST_NAV_ITEMS }));
    this.store.dispatch(autoLogin());
  }
  title = 'StayFit';
}

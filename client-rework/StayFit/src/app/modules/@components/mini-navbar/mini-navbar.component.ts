import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Subject } from 'rxjs';
import {
  filter,
  takeUntil,
} from 'rxjs/operators';
import { getCurrentRoute } from 'src/app/state/router/router.selector';

import { IAuthState } from '../../@auth/state/auth.state';
import {
  cyrillicToLatin,
} from '../../@core/utility/text-transilerator';

import { getInnerNav } from '../state/components.selector';

@Component({
  selector: 'app-mini-navbar',
  templateUrl: './mini-navbar.component.html',
  styleUrls: ['./mini-navbar.component.scss'],
})
export class MiniNavbarComponent implements OnInit, OnDestroy {
  constructor(private store: Store<IAuthState>, private router: Router) {}

  navBar: { title: string; navItems: any[] } | null = null;
  unsubscribe$: Subject<void> = new Subject();

  subCategory: string | undefined;
  isInsideGroup: boolean = false;
  currentRoute;

  ngOnInit(): void {
    this.store
      .select(getCurrentRoute)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((route) => {
        this.currentRoute = route.url;
        const { mainCategory, subCategory } = route.params;

        this.isInsideGroup = this.checkIfInGroup(mainCategory, subCategory);
      });

    this.store
      .select(getInnerNav)
      .pipe(
        filter((x) => x !== null),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((navBar) => {
        setTimeout(() => {
          this.navBar = navBar;
        }, 50);
      });
  }

  navigate(reading: any): void {
    const route = this.buildRoute(reading);

    this.router.navigate(route);
  }

  buildRoute(categoryName: string) {
    const translatedName = cyrillicToLatin(categoryName.toLowerCase());

    let parts: string[] = this.currentRoute.split('/').filter((f) => f !== '');

    if (categoryName.includes('състав')) {
      parts = [];

      parts.push('pages', 'foods');
    } else if (this.isInsideGroup) {
      parts.pop();

      parts.push(translatedName);
    } else {
      parts.push(translatedName);
    }

    parts.unshift('/');

    return parts;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  checkIfInGroup(mainGroup?: string, subGroup?: string) {
    if (mainGroup === 'statii' || mainGroup === "r'ukovodstvo") {
      return true;
    }
    if (mainGroup && subGroup) {
      return true;
    }
    return false;
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Subject } from 'rxjs';

import { delay, takeUntil, tap } from 'rxjs/operators';

import { setMiniNavbar } from 'src/app/modules/@components/state/components.actions';

import { latinToCyrillic } from 'src/app/modules/@core/utility/text-transilerator';

import { IAppState } from 'src/app/state/app.state';

import { getRouterState } from 'src/app/state/router/router.selector';

import { loadMainCategoryWithPreviews } from '../store/readings.actions';

import { getMainCategoryWithPreviews } from '../store/readings.selector';

@Component({
  selector: 'app-main-categories',
  templateUrl: './main-categories.component.html',
  styleUrls: ['./main-categories.component.scss'],
})
export class MainCategoriesComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<IAppState>,
    private router: Router
  ) {}

  unsubscribe$: Subject<void> = new Subject();

  mainCategoryWithPreviews: any;

  previews;

  hasSubGroups: boolean = false;

  ngOnInit(): void {
    this.store
      .select(getRouterState)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((route) => {
          const { mainCategory } = route.state.params;
          const category = latinToCyrillic(mainCategory);
          this.store.dispatch(loadMainCategoryWithPreviews({ category }));
        }),
        delay(100)
      )
      .subscribe();

    this.store
      .select(getMainCategoryWithPreviews)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((mcWithPreviews: any) => {
        if (mcWithPreviews) {
          this.store.dispatch(
            setMiniNavbar({
              title: mcWithPreviews?.title,
              navItems: mcWithPreviews?.categoryNames,
            })
          );
          this.mainCategoryWithPreviews = mcWithPreviews?.previews;
          this.hasSubGroups = mcWithPreviews.hasSubGroups;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  checkRoute(reading: any) {
    if (reading.name.includes('Хранителен състав')) {
      this.router.navigate(['/', 'pages', 'foods']);
    }
  }
}

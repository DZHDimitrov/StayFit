import { Component, OnDestroy, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

import { Store } from '@ngrx/store';

import { Subject } from 'rxjs';

import { takeUntil, tap } from 'rxjs/operators';

import { setMiniNavbar } from 'src/app/modules/@components/state/components.actions';

import { latinToCyrillic } from 'src/app/modules/@core/utility/text-transilerator';

import { IAppState } from 'src/app/state/app.state';

import { getRouterState } from 'src/app/state/router/router.selector';

import { loadSubCategoryWithPreviews } from '../store/readings.actions';

import { getSubCategoryWithPreviews } from '../store/readings.selector';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss'],
})
export class SubCategoriesComponent implements OnInit, OnDestroy {
  constructor(private store: Store<IAppState>,private titleService:Title) {}

  unsubscribe$: Subject<void> = new Subject();

  subCategoryWithPreviews;

  ngOnInit(): void {
    this.store
      .select(getRouterState)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((route) => {
          const { mainCategory, subCategory, id } = route.state.params;

          if (mainCategory && subCategory && !id) {
            const translatedCategory = latinToCyrillic(subCategory).split("_").join(" ");
            this.titleService.setTitle(translatedCategory.substring(0,1).toUpperCase() + translatedCategory.substring(1))
            this.store.dispatch(
              loadSubCategoryWithPreviews({
                mainCategory: latinToCyrillic(mainCategory),
                subCategory: translatedCategory,
              })
            );
          }
        })
      )
      .subscribe();

    this.store
      .select(getSubCategoryWithPreviews)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((scWithPreviews: any) => {
        if (scWithPreviews) {
          this.store.dispatch(
            setMiniNavbar({
              title: scWithPreviews?.title,
              navItems: scWithPreviews?.categoryNames,
            })
          );
          this.subCategoryWithPreviews = scWithPreviews?.previews;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

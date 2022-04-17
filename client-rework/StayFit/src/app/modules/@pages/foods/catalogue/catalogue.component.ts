import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';

import { filter, switchMap, takeUntil } from 'rxjs/operators';

import { setFoodsIntroTitle } from 'src/app/modules/@components/state/components.actions';

import { latinToCyrillic } from 'src/app/modules/@core/utility/text-transilerator';

import { IAppState } from 'src/app/state/app.state';

import { getRouterState } from 'src/app/state/router/router.selector';

import { IFoodPreview } from '../models/foods-food.model';

import {loadFoodsByCategory } from '../store/foods.actions';

import { getFoodsByCategory } from '../store/foods.selector';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
})
export class CatalogueComponent implements OnInit, OnDestroy {
  constructor(private store: Store<IAppState>) {}

  foods$!: Observable<IFoodPreview[]>;
  unsubscribe$: Subject<void> = new Subject();

  ngOnInit(): void {
    this.foods$ = this.store.select(getRouterState).pipe(
      takeUntil(this.unsubscribe$),
      filter((route) => {
        return route.state.params['category'] !== undefined;
      }),
      switchMap((route) => {
        const category = latinToCyrillic(
          route.state.params['category']
        ).replace(/-/g, ' ');

        this.store.dispatch(loadFoodsByCategory({ category }));

        this.store.dispatch(setFoodsIntroTitle({ title: category }));

        return this.store.select(getFoodsByCategory);
      })
    );
    this.foods$.subscribe(console.log)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';

import { shareReplay, take, takeUntil } from 'rxjs/operators';

import { IReading } from 'src/app/modules/@core/interfaces/readings/readings-reading.interface';

import { latinToCyrillic } from 'src/app/modules/@core/utility/text-transilerator';

import { IAppState } from 'src/app/state/app.state';

import { getRouterState } from 'src/app/state/router/router.selector';

import { loadReading } from '../store/readings.actions';

import { getReadingById } from '../store/readings.selector';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss'],
})
export class ReadingComponent implements OnInit, OnDestroy {
  constructor(private store: Store<IAppState>) {}

  currentReading$!: Observable<IReading | null>;
  unsubscribe$: Subject<void> = new Subject();

  ngOnInit(): void {
    this.store
      .select(getRouterState)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((route) => {
        const [mainCategory, subCategory, id] = this.findParts(route.state.url);

        this.store.dispatch(loadReading({ mainCategory, subCategory, id }));

        this.currentReading$ = this.store
          .select(getReadingById)
          .pipe(shareReplay());
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  findParts(url: string): string[] {
    const urlParts = url
      .split('/')
      .filter((r) => r !== undefined && r !== '')
      .slice(2);

    let mainCategory: string = latinToCyrillic(urlParts[0]);
    let subCategory: string = '';
    let id: string = '';

    if (urlParts.length == 2) {
      id = urlParts[1];
    } else if (urlParts.length == 3) {
      subCategory = urlParts[1];
      id = urlParts[2];
    }

    return [mainCategory, subCategory, id];
  }
}

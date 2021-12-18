import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { share, shareReplay, takeUntil } from 'rxjs/operators';
import { IAppState } from 'src/app/state/app.state';
import { getRouterState } from 'src/app/state/router/router.selector';
import { ReadingCategory } from '../../@core/enums/reading.category';
import { IReading } from '../../@core/interfaces/responses/readings/readings.res';
import { loadReadingById } from '../store/pages.actions';
import { getReadingById } from '../store/pages.selector';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss'],
})
export class ReadingComponent implements OnInit, OnDestroy {
  constructor(private store: Store<IAppState>) {}
  currentReading$!: Observable<IReading | null>;
  unsubscribe$: Subject<void> = new Subject();
  routeInit:string | undefined;

  ngOnInit(): void {
    this.store
      .select(getRouterState)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((route) => {
        const urlSegments = route.state.url
          .split('/')
          .filter((r) => r !== undefined);
        const { mainCategory, subCategory, id } = route.state.params;
        if (urlSegments.includes('articles')) {
          this.store.dispatch(
            loadReadingById({
              mainCategory: ReadingCategory.Articles,
              subCategory: subCategory,
            })
          );
        } else if (mainCategory && subCategory && id){
          this.store.dispatch(
            loadReadingById({ mainCategory, subCategory, id })
          );
        }
        this.currentReading$ = this.store
          .select(getReadingById)
          .pipe(shareReplay());
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

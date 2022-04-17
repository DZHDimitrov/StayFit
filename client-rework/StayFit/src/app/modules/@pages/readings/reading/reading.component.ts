import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subject } from 'rxjs';

import { map, take, takeUntil } from 'rxjs/operators';

import { getUser } from 'src/app/modules/@auth/state/auth.selector';

import { Roles } from 'src/app/modules/@core/enums/roles';

import { IAppState } from 'src/app/state/app.state';

import { getRouterState } from 'src/app/state/router/router.selector';

import { IReading } from '../models/readings-reading.model';

import { deleteReading, loadReading } from '../store/readings.actions';

import { getReadingById } from '../store/readings.selector';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss'],
})
export class ReadingComponent implements OnInit, OnDestroy {
  constructor(private store: Store<IAppState>) {}

  unsubscribe$: Subject<void> = new Subject();
  hasPrivilegeToEdit?: boolean;
  hasPrivilegeToDelete?: boolean;

  currentReading!: IReading | null;

  ngOnInit(): void {
    this.store
      .select(getRouterState)
      .pipe(take(1))
      .subscribe((route) => {
        const params = route.state.params;

        if (params.id) {
          this.store.dispatch(loadReading({ id: params.id }));
        }
      });

    this.store
      .select(getUser)
      .pipe(
        takeUntil(this.unsubscribe$),
        map((user) => {
          this.hasPrivilegeToEdit =
            user?.hasRole(Roles.ADMINISTRATOR) ||
            user?.hasRole(Roles.MODERATOR);
          this.hasPrivilegeToDelete = user?.hasRole(Roles.ADMINISTRATOR);
        })
      )
      .subscribe();

    setTimeout(() => {
      this.store
        .select(getReadingById)
        .pipe(take(1))
        .subscribe((reading) => {
          this.currentReading = reading;
        });
    }, 50);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  deleteReading(readingId?: number) {
    if (!window.confirm('Сигурни ли сте, че искате да изтриете тази статия?')) {
      return;
    }

    if (readingId) {
      this.store.dispatch(deleteReading({ readingId }));
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Subject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';

import { setMiniNavbar } from 'src/app/modules/@components/state/components.actions';

import { IAppState } from 'src/app/state/app.state';

import { loadKnowledge } from '../store/readings.actions';

import { getKnowledge } from '../store/readings.selector';

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss'],
})
export class KnowledgeComponent implements OnInit, OnDestroy {
  constructor(private store: Store<IAppState>) {}

  unsubscribe$: Subject<void> = new Subject();
  
  readingPreviewsWithCategory: any[] | null = null;

  ngOnInit(): void {
    this.store.dispatch(loadKnowledge());

    setTimeout(() => {
      this.store
        .select(getKnowledge)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((k) => {
          if (k) {
            this.store.dispatch(
              setMiniNavbar({ title: k.title, navItems: k.categoryNames })
            );
            this.readingPreviewsWithCategory = k.readingPreviewsWithCategory;
          }
        });
    }, 100);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

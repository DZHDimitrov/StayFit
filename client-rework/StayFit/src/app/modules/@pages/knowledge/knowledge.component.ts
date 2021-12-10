import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/state/app.state';
import { ReadingsService } from '../../@core/backend/services/readings.service';
import { ILatestCategoryReadings } from '../../@core/interfaces/responses/readings/readings.res';
import { loadLatestReadings } from '../store/pages.actions';
import { getLatestReadings } from '../store/pages.selector';

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss'],
})
export class KnowledgeComponent implements OnInit {
  readingsByMainCategory$!: Observable<ILatestCategoryReadings[]>;
  constructor(
    private store: Store<IAppState>,
    private service: ReadingsService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadLatestReadings());
    this.readingsByMainCategory$ = this.store.select(getLatestReadings);
    this.readingsByMainCategory$.subscribe(console.log);
  }
}

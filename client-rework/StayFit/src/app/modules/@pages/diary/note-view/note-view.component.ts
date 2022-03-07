import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, pipe, Subject, Subscription } from 'rxjs';
import {
  delay,
  filter,
  shareReplay,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { INote } from 'src/app/modules/@core/interfaces/diary/diary.interface';
import { IAppState } from 'src/app/state/app.state';
import { getCurrentRoute } from 'src/app/state/router/router.selector';
import { loadNoteById, loadNoteByIdSuccess } from '../store/diary.actions';
import { getNoteById } from '../store/diary.selectors';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.scss'],
})
export class NoteViewComponent implements OnInit, AfterContentInit, OnDestroy {
  constructor(private store: Store<IAppState>, private router: Router) {}

  unsubscribe$: Subject<void> = new Subject();
  note!: INote | null;

  routeSubscription!:Subscription

  ngOnInit(): void {
   this.store
      .select(getCurrentRoute)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((route) => {
        const { noteId } = route.params;
        if (noteId) {
          this.store.dispatch(loadNoteById({ noteId,withRedirection:true }));
        }
      });
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.store
        .select(getNoteById)
        .pipe(
          takeUntil(this.unsubscribe$),
          filter((n) => n !== null)
        )
        .subscribe((n) => {
          this.note = n;
        });
    }, 100);
  }

  showPreviousDay() {
    this.store.dispatch(
      loadNoteById({ noteId: this.note?.id as number,withRedirection:true, take: 'previous' })
    );
  }

  showNextDay() {
    this.store.dispatch(
      loadNoteById({ noteId: this.note?.id as number,withRedirection:true, take: 'next' })
    );
  }

  endRouteSubscription() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

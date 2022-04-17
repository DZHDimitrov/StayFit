import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';

import { shareReplay, takeUntil } from 'rxjs/operators';

import { NavigationType } from 'src/app/modules/@core/enums/navigation.enum';

import { IAppState } from 'src/app/state/app.state';

import { getCurrentRoute } from 'src/app/state/router/router.selector';

import { INote } from '../models/diary.model';

import { DiaryService } from '../services/diary.service';

import { loadNotes } from '../store/diary.actions';

import { getNotes } from '../store/diary.selectors';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss', '../../../../styles/index.scss'],
})
export class OverviewComponent implements OnInit, AfterContentInit, OnDestroy {
  constructor(
    private state: Store<IAppState>,
    private router: Router,
    private service: DiaryService,
    private titleService:Title,
  ) {
    this.titleService.setTitle('Дневник')
  }

  unsubscribe$:Subject<void> = new Subject(); 
  notes$!: Observable<INote[]>;

  year!: number;
  month!: number;
  monthDisplay!:string;
  navigationType = NavigationType;

  ngOnInit(): void {
    this.state.select(getCurrentRoute).pipe(takeUntil(this.unsubscribe$)).subscribe((r) => {
      const { year, month } = r.params;
      this.year = Number.parseInt(year);
      this.month = Number.parseInt(month);
      this.monthDisplay = this.service.getMonthAsString(this.month);
      
      if (year && month) {
        this.state.dispatch(loadNotes({ year, month }));
      }
    });
  }

  ngAfterContentInit(): void {
    this.notes$ = this.state
    .select(getNotes)
    .pipe(takeUntil(this.unsubscribe$),shareReplay(1));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  navigate(way: NavigationType) {
    if (way === NavigationType.BACKWARDS) {
      const { previousMonth, previousYear } = this.decrementDate();

      this.router.navigate(['pages','diary',previousYear,previousMonth,'overview']);

    } else if (way === NavigationType.FORWARDS){
      const { nextMonth, nextYear } = this.incrementDate();

      this.router.navigate(['pages', 'diary', nextYear, nextMonth, 'overview']);
    }
  }

  redirect(note:INote,day:number) {
    if (note.isModified){
      this.router.navigate(['pages','diary',note.id,'view']);
      return;
    }
    
    this.router.navigate(['pages','diary',`${this.padNumber(this.month)}-${this.padNumber(day)}-${this.year}`,'add'])
  }

  decrementDate() {
    const { previousMonth, previousYear } = this.service.decrementDate(this.year,this.month);

    this.month = previousMonth;
    this.year = previousYear;
    this.monthDisplay = this.service.getMonthAsString(this.month);

    return {
      previousMonth: this.padNumber(previousMonth),
      previousYear,
    };
  }

  incrementDate() {
    const {nextMonth,nextYear} = this.service.incrementDate(this.year,this.month);

    this.month = nextMonth;
    this.year = nextYear;
    this.monthDisplay = this.service.getMonthAsString(this.month);

    return {
      nextMonth: this.padNumber(nextMonth),
      nextYear,
    };
  }

  private padNumber(monthNumber: string | number) {
    return monthNumber.toString().length < 2 ? '0' + monthNumber : monthNumber;
  }
}

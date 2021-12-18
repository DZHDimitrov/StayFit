import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getRouterState } from 'src/app/state/router/router.selector';
import { IAuthState } from '../../@auth/state/auth.state';
import { getInnerNav } from '../state/components.selector';

@Component({
  selector: 'app-inner-navbar',
  templateUrl: './inner-navbar.component.html',
  styleUrls: ['./inner-navbar.component.scss'],
})
export class InnerNavbarComponent implements OnInit, OnDestroy {
  navBar$!: Observable<{ title: string; navItems: any[] }>;
  unsubscribe$: Subject<void> = new Subject();
  subCategory: string | undefined;
  constructor(
    private store: Store<IAuthState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  ngOnInit(): void {
    this.navBar$ = this.store.select(getInnerNav);
    this.store
      .select(getRouterState)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((route) => {
        this.subCategory = route.state.params['subCategory'];
      });
  }

  loadGroup(reading: any) {
    if (
      (reading.isRoot !== undefined && reading.isRoot == true) ||
      this.subCategory !== undefined
    ) {
      this.router.navigate(['../', reading.searchName], {
        relativeTo: this.route,
      });
    } else {
      this.router.navigate([reading.searchName], {
        relativeTo: this.route,
      });
    }
  }
}

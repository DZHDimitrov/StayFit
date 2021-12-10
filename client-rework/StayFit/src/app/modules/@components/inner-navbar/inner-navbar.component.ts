import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAuthState } from '../../@auth/state/auth.state';
import { ReadingsService } from '../../@core/backend/services/readings.service';
import { Readings } from '../../@core/enums/reading.category';
import {
  setInnerNavItems,
  setInnerNavTitle,
} from '../state/components.actions';
import {
  getInnerNavItems,
  getInnerNavTitle,
} from '../state/components.selector';

@Component({
  selector: 'app-inner-navbar',
  templateUrl: './inner-navbar.component.html',
  styleUrls: ['./inner-navbar.component.scss'],
})
export class InnerNavbarComponent implements OnInit {
  navItems$!: Observable<any[]>;
  navTitle$!: Observable<string>;
  constructor(
    private store: Store<IAuthState>,
    private service: ReadingsService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(setInnerNavItems({ category: undefined }));
    this.navItems$ = this.store.select(getInnerNavItems);
    this.navTitle$ = this.store.select(getInnerNavTitle);
  }

  changeTitle(title: string) {
    console.log(title);
    this.store.dispatch(setInnerNavTitle({ title }));
  }
}

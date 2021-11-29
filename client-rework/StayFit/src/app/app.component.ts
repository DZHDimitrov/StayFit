import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLogin } from './modules/@auth/state/auth.actions';
import { getErrorMessage, getLoading } from './modules/shared/state/shared.selector';
import { IAppState } from './state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<IAppState>) {}
  showLoading$!: Observable<boolean>;
  errorMessage$!: Observable<string>;
  ngOnInit(): void {
    this.showLoading$ = this.store.select(getLoading);
    this.errorMessage$ = this.store.select(getErrorMessage);
    this.store.dispatch(autoLogin());
  }
  title = 'StayFit';

}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getLoading } from '../modules/shared/state/shared.selector';
import { IAppState } from '../state/app.state';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  constructor(private store:Store<IAppState>) { }

  // showLoading$!: Observable<boolean>;

  ngOnInit(): void {
    // this.showLoading$ = this.store.select(getLoading);
  }

}

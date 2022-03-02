import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/state/app.state';
import { getFoodsIntroTitle } from '../state/components.selector';

@Component({
  selector: 'app-foods-intro',
  templateUrl: './foods-intro.component.html',
  styleUrls: ['./foods-intro.component.scss'],
})
export class FoodsIntroComponent implements OnInit {
  title$!: Observable<string>;

  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.title$ = this.store.select(getFoodsIntroTitle);
  }
}

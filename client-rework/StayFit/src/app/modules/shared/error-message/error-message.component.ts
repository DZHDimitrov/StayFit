import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/app/state/app.state';
import { getErrorMessage } from '../state/shared.selector';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {
  constructor(private readonly store: Store<IAppState>) {}
  errorMessage$!: Observable<string>;

  ngOnInit(): void {
    this.errorMessage$ = this.store.select(getErrorMessage);
  }
}

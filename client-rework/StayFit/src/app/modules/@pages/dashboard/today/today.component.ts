import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getUser, isAuthenticated } from 'src/app/modules/@auth/state/auth.selector';
import {
  ITask,
  ITaskDisplay,
} from 'src/app/modules/@core/interfaces/dashboard/dashboard-task.interface';
import { decorateTask } from 'src/app/modules/@core/utility/component-decorator.helper';
import { IAppState } from 'src/app/state/app.state';
import { createDiary } from '../../diary/store/diary.actions';
import { loadTasks } from '../store/dashboard.actions';
import { getTasks } from '../store/dashboard.selectors';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit, AfterContentInit {
  constructor(private store: Store<IAppState>) {}

  tasks$!: Observable<ITaskDisplay[]>;

  testMap: Map<string, Function> = new Map();

  actions = {
    createDiary: () => {
      this.store.dispatch(createDiary());
    }
  }

  ngOnInit(): void {
    this.store.dispatch(loadTasks());

    this.store.select(getUser).subscribe(console.log);
  }

  ngAfterContentInit(): void {
    this.tasks$ = this.store.select(getTasks).pipe(
      map((tasks) => {
        return tasks.map(decorateTask);
      })
    );
    // this.tasks$.subscribe(console.log)
  }

  callAction(action?: string) {
    if(action){
      const func = this.actions[action];
      func();
    }
  }
}

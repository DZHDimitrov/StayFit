import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ITask } from 'src/app/modules/@pages/dashboard/models/dashboard-task.model';

import { IApiResponse } from '../../interfaces/api.response';

import { DashboardApi } from '../api/dashboard.api';

@Injectable()
export class DashboardService {
  constructor(private api: DashboardApi) {}

  loadTasks(): Observable<IApiResponse<ITask[]>> {
    return this.api.loadTasks();
  }
}

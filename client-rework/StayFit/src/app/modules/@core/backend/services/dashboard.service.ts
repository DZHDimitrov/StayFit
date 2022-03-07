import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IApiResponse } from '../../interfaces/api.response';

import { ITask } from '../../interfaces/dashboard/dashboard-task.interface';

import { DashboardApi } from '../api/dashboard.api';

@Injectable()
export class DashboardService {
  constructor(private api: DashboardApi) {}

  loadTasks(): Observable<IApiResponse<ITask[]>> {
    return this.api.loadTasks();
  }
}

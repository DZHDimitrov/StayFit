import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IApiResponse } from '../../interfaces/api.response';

import { ITask } from '../../interfaces/dashboard/dashboard-task.interface';

import { HttpService } from './http.service';

@Injectable()
export class DashboardApi {
  private readonly apiController = 'dashboard';

  constructor(private api: HttpService) {}

  loadTasks(): Observable<IApiResponse<ITask[]>> {
    return this.api.get(`${this.apiController}`);
  }
}

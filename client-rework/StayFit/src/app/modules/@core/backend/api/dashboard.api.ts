import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ITask } from 'src/app/modules/@pages/dashboard/models/dashboard-task.model';

import { IApiResponse } from '../../interfaces/api.response';

import { HttpService } from './http.service';

@Injectable()
export class DashboardApi {
  private readonly apiController = 'dashboard';

  constructor(private api: HttpService) {}

  loadTasks(): Observable<IApiResponse<ITask[]>> {
    return this.api.get(`${this.apiController}`);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../interfaces/api.response';
import { ICreateReadingRequest } from '../../interfaces/requests/reading.req';
import {
  ICreateReadingRes,
  IDeleteReading,
  IReadingData,
} from '../../interfaces/responses/readings/readings.res';
import { ReadingsApi } from '../api/readings.api';

@Injectable({
  providedIn: 'root',
})
export class ReadingsService {
  constructor(private api: ReadingsApi) {}

  listByMainCategory(category: string): Observable<IApiResponse<IReadingData>> {
    return this.api.listByMainCategory(category);
  }

  listBySubCategory(
    category: string,
    subcategory: string
  ): Observable<IApiResponse<IReadingData>> {
    return this.api.listBySubCategory(category, subcategory);
  }

  loadLatest(category: string): Observable<IApiResponse<IReadingData>> {
    return this.api.loadLatest(category);
  }

  loadByIdInSubGroup(
    category: string,
    id: number,
    subCategory?: number
  ): Observable<IApiResponse<IReadingData>> {
    return this.api.loadByIdInSubGroup(category, id, subCategory);
  }

  add(data: ICreateReadingRequest): Observable<IApiResponse<ICreateReadingRes>> {
    return this.api.add(data);
  }

  update(data: any): Observable<any> {
    return this.api.update(data);
  }

  delete(id: number): Observable<IApiResponse<IDeleteReading>> {
    return this.api.delete(id);
  }
}

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IReadingCategory } from 'src/app/modules/@pages/readings/models/readings-category.model';

import { IKnowledge, IMainCategoryWithPreviews, ISubCategoryWithPreviews } from 'src/app/modules/@pages/readings/models/readings-previews.model';

import { ICreateReadingRes, IDeleteReading, IReading } from 'src/app/modules/@pages/readings/models/readings-reading.model';

import { IApiResponse } from '../../interfaces/api.response';

import { ICreateReadingRequest } from '../../interfaces/requests/reading.req';

import { HttpService } from './http.service';

@Injectable()
export class ReadingsApi {
  private readonly apiController: string = 'readings';
  
  constructor(private api: HttpService) {}

  loadKnowledge(): Observable<IApiResponse<IKnowledge>> {
    return this.api.get(`${this.apiController}/latest`);
  }

  loadReadingMainCategories(): Observable<IApiResponse<IReadingCategory[]>> {
    return this.api.get(`${this.apiController}/categories`);
  }

  loadReadingSubCategories(mainId:number): Observable<IApiResponse<IReadingCategory[]>> {
    return this.api.get(`${this.apiController}/categories?mainId=${mainId}`);
  }

  loadMainCategoryWithPreviews(category: string): Observable<IApiResponse<IMainCategoryWithPreviews>> {
    return this.api.get(`${this.apiController}/${category}`);
  }

  loadSubCategoryWithPreviews(category: string, subcategory: string): Observable<IApiResponse<ISubCategoryWithPreviews>> {
    return this.api.get(`${this.apiController}/${category}/${subcategory}`);
  }

  loadReading(id:string):Observable<IApiResponse<IReading>> {
    return this.api.get(`${this.apiController}/reading?id=${id}`);
  }

  add(data: ICreateReadingRequest): Observable<IApiResponse<ICreateReadingRes>> {
    return this.api.post(this.apiController, data);
  }

  update(data: any): Observable<any> {
    return this.api.put(this.apiController, data);
  }

  delete(id: number): Observable<IApiResponse<IDeleteReading>> {
    return this.api.delete(`${this.apiController}/${id}`);
  }
}

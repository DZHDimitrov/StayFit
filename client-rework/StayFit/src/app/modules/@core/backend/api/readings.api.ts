import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IApiResponse } from '../../interfaces/api.response';

import { ICreateReadingRequest } from '../../interfaces/requests/reading.req';

import { HttpService } from './http.service';

import {IKnowledge, IMainCategoryWithPreviews, ISubCategoryWithPreviews } from '../../interfaces/readings/readings-previews.interface';

import { ICreateReadingRes, IDeleteReading, IReading } from '../../interfaces/readings/readings-reading.interface';

import { IReadingCategory } from '../../interfaces/readings/readings-category.interface';

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

  loadReading(category:string,subCategory?:string,id?:string):Observable<IApiResponse<IReading>> {
    let queryString:string[] | string= [];

    if (subCategory) {
      queryString.push(`subCategory=${subCategory}`);
    }

    if (id) {
      queryString.push(`id=${id.toString()}`);
    }

    queryString = queryString.join('&');

    return this.api.get(`${this.apiController}/id/${category}?${queryString}`);
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

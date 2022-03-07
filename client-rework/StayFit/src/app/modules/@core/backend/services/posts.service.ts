import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IApiResponse } from '../../interfaces/api.response';

import {
  ICreatePostRes,
  IDeletePostRes,
  IPostMainCategoryRes,
  IPostPreviewRes,
  IPostRes,
  IUpdatePostRes,
} from '../../interfaces/forum/forum-post.interface';

import { PostApi } from '../api/posts.api';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private api: PostApi) {}

  listCategories(): Observable<IApiResponse<IPostMainCategoryRes>> {
    return this.api.listCategories();
  }

  listPreviewsByCategory(
    subCategoryId: number,
    page?: number
  ): Observable<IApiResponse<IPostPreviewRes>> {
    return this.api.listPreviewsByCategory(subCategoryId, page);
  }

  listActive(): Observable<IApiResponse<IPostPreviewRes>> {
    return this.api.listActive();
  }
  listRecent(): Observable<IApiResponse<IPostPreviewRes>> {
    return this.api.listRecent();
  }

  listMine(): Observable<IApiResponse<IPostPreviewRes>> {
    return this.api.listMine();
  }

  getById(postId: number): Observable<IApiResponse<IPostRes>> {
    return this.api.getById(postId);
  }

  add(data: any): Observable<IApiResponse<ICreatePostRes>> {
    return this.api.add(data);
  }

  update(data: any): Observable<IApiResponse<IUpdatePostRes>> {
    return this.api.update(data);
  }

  delete(postId: number): Observable<IApiResponse<IDeletePostRes>> {
    return this.api.delete(postId);
  }
}

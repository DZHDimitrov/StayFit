import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IApiResponse } from '../../interfaces/api.response';

import {
  ICommentPreviewRes,
  ICommentsRes,
  ICreateCommentRes,
  IDeleteCommentRes,
} from '../../interfaces/forum/forum-comments.interface';

import { CommentsApi } from '../api/comments.api';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private api: CommentsApi) {}

  listByPostId(postId: number): Observable<IApiResponse<ICommentsRes>> {
    return this.api.listByPostId(postId);
  }

  listActive(): Observable<IApiResponse<ICommentPreviewRes>> {
    return this.api.listActive();
  }

  listRecent(): Observable<IApiResponse<ICommentPreviewRes>> {
    return this.api.listRecent();
  }

  listMine(): Observable<IApiResponse<ICommentPreviewRes>> {
    return this.api.listMine();
  }

  add(data: any): Observable<IApiResponse<ICreateCommentRes>> {
    return this.api.add(data);
  }

  delete(commentId: string): Observable<IApiResponse<IDeleteCommentRes>> {
    return this.api.delete(commentId);
  }
}
